import { Injectable } from '@nestjs/common';
import { ChannelService, Customer, ID, PaginatedList, RequestContext, TransactionalConnection } from '@vendure/core';
import { ShopingMallListOptions } from '../generated-shop-types';
import { MallEntry } from '../entities/mall-entry.entity';
import { ShoppingMall } from '../entities/shopping-mall.entity';
import { ShoppingMallInput } from '../generated-admin-types';

@Injectable()
export class MallService {
    constructor(
        private connection: TransactionalConnection,
        private channelService: ChannelService,
    ) {}
    
    async checkInIntoMall(customer: Customer, shoppingMallId: ID):Promise <MallEntry> {
        let activeEntry = await this.getActiveMall(customer);
        if(activeEntry) {
            throw new Error('Already checked in');
        }
        const mall = await this.connection.getRepository(ShoppingMall).findOneOrFail(shoppingMallId);
        return await this.connection.getRepository(MallEntry).save({
            customer,
            mall,
            checkedInAt: new Date(),
        });
    }

    async checkOutOfMall(customer: Customer) {
        let activeEntry = await this.getActiveMall(customer);
        if(!activeEntry) {
            throw new Error('No active entry');
        }
        activeEntry.checkedOutAt = new Date();
        return await this.connection.getRepository(MallEntry).save(activeEntry);
    }

    async getActiveMall(customer: Customer): Promise<MallEntry | null> {
        const entry = await this.connection.getRepository(MallEntry).findOne({where: {'checkedOutAt': null, customer:{id: customer.id}}, relations: ['mall']});
        return entry || null;
    }
    
    async getShoppingMalls(ctx: RequestContext): Promise<PaginatedList<ShoppingMall>> {
        const [items, totalItems] = await this.connection.getRepository(ShoppingMall).findAndCount();
        return {
            items,
            totalItems,
        }
    }

    async getNearbyMalls(ctx: RequestContext, options: ShopingMallListOptions): Promise<PaginatedList<ShoppingMall>> {
        const [items, totalItems] = await this.connection.getRepository(ShoppingMall).findAndCount({
            // where: {
            //     location: {
            //         geo: {
            //             $near: {
            //                 $geometry: {
            //                     type: 'Point',
            //                     coordinates: [options.lng, options.lat],
            //                 },
            //                 $maxDistance: options.radius,
            //             },
            //         },
            //     },
            // }
        });
        return {
            items,
            totalItems,
        }
    }

    async createShoppingMall(ctx: RequestContext, input: ShoppingMallInput): Promise<ShoppingMall> {
        return await this.connection.getRepository(ShoppingMall).save({
            name: input.name,
            address: input.address,
            city: input.city,
            state: input.state,
            postalCode: input.postalCode,
        });
    }

    async getShoppingMall(ctx: RequestContext, id: ID): Promise<ShoppingMall> {
        return await this.connection.getRepository(ShoppingMall).findOneOrFail(id);
    }

    async linkShoppingMallToChannel(ctx: RequestContext, mallId:ID, channelId:ID): Promise<ShoppingMall> {
        let mall =  await this.getShoppingMall(ctx, mallId);
        let channel = await this.channelService.findOne(ctx, channelId);
        
        if(!mall){
            throw new Error('Mall not found');
        }

        if(!channel) {
            throw new Error('Channel not found');
        }
        
        (channel.customFields as any).featuredMallId = mallId;
        await this.channelService.update(ctx, channel);
        return mall;
    }
}