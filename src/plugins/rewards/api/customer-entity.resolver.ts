import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Customer, Promotion } from '@vendure/core';
import { RewardsService } from './rewards.service';
import { NextTier } from '../generated-shop-types';
@Resolver('Customer')
export class CustomerEntityResolver {
    constructor(
        private rewardsService: RewardsService
        ) {}

    @ResolveField('rewardsBalance')
    async getRewardsBalance(@Parent() customer: Customer): Promise<number> {
       return this.rewardsService.getRewardsBalance(customer);
    }

    @ResolveField('rewardsTier')
    async getRewardsTier(@Parent() customer: Customer): Promise<string> {
        return this.rewardsService.getRewardsTier(customer);
    }

    @ResolveField('nextRewardsTier')
    async getNextRewardsTierCondition(@Parent() customer: Customer): Promise<NextTier> {
        return this.rewardsService.getNextRewardTier(customer);
    }

    @ResolveField('avialableSpins')
    async getAvialableSpins(@Parent() customer: Customer): Promise<number> {
        return this.rewardsService.getRemainingSpins(customer);
    }

    @ResolveField('defaultPromotions')
    async getDefaultPromotions(@Parent() customer: Customer): Promise<Promotion[]> {
        return this.rewardsService.getDefaultPromotions(customer);
    }
}