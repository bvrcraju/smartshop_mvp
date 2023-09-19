import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    Ctx,
    CustomerService,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { MallCheckInInput, ShopingMallListOptions } from '../generated-shop-types';
import { MallService } from './mall.service';
@Resolver()
export class ShoppingMallShopResolver {
    constructor(
        private mallService:MallService,
        private customerService:CustomerService) {}

    @Query()
    async getNearbyMalls(ctx: RequestContext, @Args() arg: ShopingMallListOptions){
        return this.mallService.getNearbyMalls(ctx, arg);
    }

    @Transaction()
    @Mutation()
    async checkInIntoMall(@Ctx() ctx: RequestContext, @Args('input') input: MallCheckInInput){
        const userId = ctx.activeUserId;
        if(!userId){
            return undefined;
        }
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        
        if (!customer) {
            return undefined;
        }
        return this.mallService.checkInIntoMall(customer, input.mallId);
    }

    @Transaction()
    @Mutation()
    async checkOutOfMall(@Ctx() ctx: RequestContext){
        const userId = ctx.activeUserId;
        if(!userId){
            return undefined;
        }
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        
        if (!customer) {
            return undefined;
        }
        return this.mallService.checkOutOfMall(customer);
    }

}