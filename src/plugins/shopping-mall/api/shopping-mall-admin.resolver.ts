import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    ChannelService,
    Ctx,
    CustomerService,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { ShoppingMall } from '../entities/shopping-mall.entity';
import { ShoppingMallInput } from '../generated-admin-types';
import { MallService } from './mall.service';
@Resolver()
export class ShoppingMallAdminResolver {
    constructor(
        private mallService:MallService
        ) {}

    @Transaction()
    @Mutation()
    async createShoppingMall(@Ctx() ctx: RequestContext, @Args('input') input: ShoppingMallInput ){
        return this.mallService.createShoppingMall(ctx, input);
    }

    @Transaction()
    @Mutation()
    async linkShoppingMallToChannelById(@Ctx() ctx: RequestContext, @Args('input') input: {channelId: string, mallId: string}){
        return this.mallService.linkShoppingMallToChannel(ctx, input.mallId, input.channelId);
    }

    @Query()
    async getShoppingMalls(@Ctx() ctx: RequestContext){
        return this.mallService.getShoppingMalls(ctx);
    }

    @Query()
    async getShoppingMallById(@Ctx() ctx: RequestContext, @Args('id') id: string){
        return this.mallService.getShoppingMall(ctx, id);
    }
}