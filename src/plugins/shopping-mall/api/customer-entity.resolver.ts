import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ctx, Customer, RequestContext } from '@vendure/core';
import { MallEntry } from '../entities/mall-entry.entity';
import { ShoppingMall } from '../entities/shopping-mall.entity';
import { MallService } from './mall.service';
@Resolver('Customer')
export class CustomerEntityResolver {
    constructor(
        private mallService: MallService
        ) {}

    @ResolveField('activeMall')
    async getActiveMall(@Parent() customer: Customer, @Ctx() ctx: RequestContext): Promise<MallEntry|null> {
       return this.mallService.getActiveMall(customer);
    }
}