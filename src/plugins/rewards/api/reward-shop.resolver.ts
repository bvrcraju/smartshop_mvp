import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    ActiveOrderService,
    Allow,
    ChannelService,
    Ctx,
    Customer,
    CustomerService,
    LanguageCode,
    Order,
    OrderService,
    patchEntity,
    Permission,
    PromotionService,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { Success } from '../generated-admin-types';
import { MutationaddSpinRewardsToActiveCustomerArgs, SpinWheelRewardSettings } from '../generated-shop-types';
import { RewardsService } from './rewards.service';
@Resolver()
export class RewardsShopResolver {
    constructor(
        private rewardsService: RewardsService, 
        private customerService: CustomerService,
        private activeOrderService: ActiveOrderService,
        private orderService: OrderService,
        private promotionService: PromotionService,
        private channelService: ChannelService
    ) {}

    @Query()
    async spinWheelRewardSettings(ctx: RequestContext): Promise<SpinWheelRewardSettings> {
        return this.rewardsService.getSpinWheelRewardSettings(ctx);
    }

    @Transaction()
    @Mutation()
    async addSpinRewardsToActiveCustomer(@Ctx() ctx: RequestContext, @Args() { input }: MutationaddSpinRewardsToActiveCustomerArgs):Promise<Customer | undefined> {
        const userId = ctx.activeUserId;
        if(!userId){
            return undefined;
        }
        const customer = await this.customerService.findOneByUserId(ctx, userId);
        
        if (!customer) {
            return undefined;
        }
        return this.rewardsService.addSpinRewardsToCustomer(customer, input.rewards);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Owner)
    async applyDefaultPromotions(
        @Ctx() ctx: RequestContext,
    ): Promise<Success> {
        const aCtx = await this.createContext("");
        const order = await this.activeOrderService.getOrderFromContext(ctx, true);
        const result = await this.promotionService.findAll(aCtx);
        result.items.forEach(async promotion => {
            if(promotion.customFields.isDefault){
                await this.orderService.applyCouponCode(ctx, order.id, promotion.couponCode);
            }
        });
        return {success: true};
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.Owner)
    async removeDefaultPromotions(
        @Ctx() ctx: RequestContext,
    ): Promise<Success> {
        const aCtx = await this.createContext("");
        const order = await this.activeOrderService.getOrderFromContext(ctx, true);
        const result = await this.promotionService.findAll(aCtx);
        result.items.forEach(async promotion => {
            if(promotion.customFields.isDefault){
                await this.orderService.removeCouponCode(ctx, order.id, promotion.couponCode);
            }
        });
        return {success: true};
    }


    private async createContext(channelToken: string): Promise<RequestContext> {
        const channel = await this.channelService.getChannelFromToken(channelToken);
        return new RequestContext({
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
        });
    }
}