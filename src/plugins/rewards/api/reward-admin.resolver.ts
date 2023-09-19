import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
    Allow,
    Ctx,
    patchEntity,
    Permission,
    Customer,
    RequestContext,
    Transaction,
} from '@vendure/core';
import { RewardAuditEntry } from '../entities/reward-audit-entry.entity';
import { MutationloadRewardsArgs, MutationredeemRewardsArgs } from '../generated-admin-types';
import { RewardsService } from './rewards.service';
@Resolver()
export class RewardsAdminResolver {
    constructor(private rewardsService: RewardsService) {}

    @Transaction()
    @Mutation()
    async loadRewards(@Ctx() ctx: RequestContext, @Args() { input }: MutationloadRewardsArgs):Promise<Customer> {
        return this.rewardsService.loadRewards(ctx, input);
    }

    @Transaction()
    @Mutation()
    async redeemRewards(@Ctx() ctx: RequestContext, @Args() { input }: MutationredeemRewardsArgs):Promise<Customer> {
        return this.rewardsService.redeemRewards(ctx, input);
    }
}