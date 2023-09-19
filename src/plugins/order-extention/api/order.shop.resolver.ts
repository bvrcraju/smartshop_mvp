import { Args, Resolver, Mutation, ResolveField } from "@nestjs/graphql";
import {
  CancelOrderResult,
  MutationCancelOrderArgs,
} from "@vendure/common/lib/generated-types";
import {
  Allow,
  Ctx,
  ErrorResultUnion,
  Order,
  OrderService,
  Permission,
  RequestContext,
  Transaction,
} from "@vendure/core";
@Resolver()
export class OrderShopResolver {
  constructor(private orderService: OrderService) {}
  @Transaction()
  @Mutation()
  @Allow(Permission.Owner)
  async cancelOrder(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationCancelOrderArgs
  ): Promise<ErrorResultUnion<CancelOrderResult, Order> | undefined> {
    if (ctx.authorizedAsOwnerOnly) {
      return this.orderService.cancelOrder(ctx, args.input);
    }
  }
}
