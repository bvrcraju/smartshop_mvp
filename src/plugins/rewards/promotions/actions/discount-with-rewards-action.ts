import { LanguageCode } from '@vendure/common/lib/generated-types';

import { PromotionOrderAction } from '@vendure/core';
import { discountWithRewardsCondition } from '../conditions/discount-with-rewards-condition';
let rewardsService: import("../../api/rewards.service").RewardsService;

export const discountWithRewardsAction = new PromotionOrderAction({
    code: 'apply_discount_with_rewards',
    async init(injector) {
        const { RewardsService } = await import('../../api/rewards.service');
        rewardsService = injector.get(RewardsService);
    },
    args: {
        taxInclusive: { type: "boolean" },
        discount: {
            type: "int",
            ui: {
                component: 'number-form-input',
                suffix: '%',
            },
            label: [{ languageCode: LanguageCode.en, value: 'Percent of Rewards for Redumption' }],
        }        
    },
    conditions: [discountWithRewardsCondition],
    async execute(ctx, order, args, state) {
        const {discountAmount} = await rewardsService.getRedeemableRewardsOnOrder(order, args.discount, args.taxInclusive);
        return -discountAmount;
    },
    description: [{ languageCode: LanguageCode.en, value: 'Discount order by fixed amount by redeeming rewards' }],
});
