import { RewardsService } from "./rewards.service";
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ctx, ID, PromotionService, RequestContext } from "@vendure/core";
import { Discount } from "../generated-admin-types";

@Resolver('Discount')
export class DiscountEntityResolver {
    constructor(
        private rewardsService: RewardsService,
        private promotionService: PromotionService,
    ) {}
    @ResolveField()
    async rewards(@Ctx() ctx: RequestContext, @Parent() discount: Discount): Promise<number> {
        const promotionId = discount.adjustmentSource.split(":")[1];
        var promotion = await this.promotionService.findOne(ctx, promotionId);
        if (promotion?.customFields.type === "discount-with-rewards") {
            return this.rewardsService.convertAmountToRewards(discount.amountWithTax);
        }
        return 0;
    }
}