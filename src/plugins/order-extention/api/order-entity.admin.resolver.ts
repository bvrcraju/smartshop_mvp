import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { AddFulfillmentToOrderResult, MutationAddFulfillmentToOrderArgs, MutationTransitionFulfillmentToStateArgs, QueryOrdersArgs } from '@vendure/common/lib/generated-types';
import { Allow, Ctx, ErrorResultUnion, FulfillmentState, Order, Permission, RequestContext } from '@vendure/core';
import { PaginatedList } from '@vendure/common/lib/shared-types';
import {OrdersByVendorService} from './orders-by-vendor.service';
import {Transaction} from '@vendure/core';
import {Fulfillment} from '@vendure/core/dist/entity/fulfillment/fulfillment.entity';

@Resolver()
export class OrdersByVendorAdminResolver {
    constructor( private orderService: OrdersByVendorService) {}
    @Query()
    @Allow(Permission.ReadOrder)
    async vendorOrders(@Ctx() ctx: RequestContext, @Args() args: QueryOrdersArgs): Promise<PaginatedList<Order>> {
        return this.orderService.findAll(ctx, args.options || undefined);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async addFulfillmentToOrderByVendor(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationAddFulfillmentToOrderArgs,
    ): Promise<ErrorResultUnion<AddFulfillmentToOrderResult, Fulfillment>> {
        return this.orderService.createFulfillmentByVendor(ctx, args.input);
    }

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async transitionFulfillmentToState(
        @Ctx() ctx: RequestContext,
        @Args() args: MutationTransitionFulfillmentToStateArgs,
    ) {
        return this.orderService.transitionFulfillmentToStateByVendor(ctx, args.id, args.state as FulfillmentState);
    }

}