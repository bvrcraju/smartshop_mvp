import { ID, LanguageCode, PromotionCondition, TtlCache } from "@vendure/core";
import { Subscription } from "rxjs";

// let customerService: import("@vendure/core").CustomerService;
// let globalSettingsService: import("@vendure/core").GlobalSettingsService;
let rewardsService: import("../../api/rewards.service").RewardsService;
let subscription: Subscription | undefined;

// const fiveMinutes = 5 * 60 * 1000;
// const cache = new TtlCache<ID, ID[]>({ ttl: fiveMinutes });
// const settingsCache = new TtlCache<String, Number|String>({ ttl: fiveMinutes });

export const discountWithRewardsCondition = new PromotionCondition({
  /** A unique identifier for the condition */
  code: "discount_with_rewards",

  /**
   * A human-readable description. Values defined in the
   * `args` object can be interpolated using the curly-braces syntax.
   */
  description: [
    {
      languageCode: LanguageCode.en,
      value: "If customer has required rewards for order purchase",
    },
  ],
  /**
   * Arguments which can be specified when configuring the condition
   * in the Admin UI. The values of these args are then available during
   * the execution of the `check` function.
   */
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
  async init(injector) {
    // const { CustomerService, GlobalSettingsService } = await import('@vendure/core');
    // customerService = injector.get(CustomerService);
    // globalSettingsService = injector.get(GlobalSettingsService);

    const { RewardsService } = await import('../../api/rewards.service');
    rewardsService = injector.get(RewardsService);


  },
  destroy() {
    subscription?.unsubscribe();
  },

  async check(ctx, order, args) {
    if (!order.customer) {
      return false;
    }
    const isEligible = await rewardsService.isCustomerHavingRewardsToRedeemOnOrder(order, args.discount, args.taxInclusive);
    if(!isEligible) {
      return false;
    }else{
        const {redeemableRewards, discountAmount} = await rewardsService.getRedeemableRewardsOnOrder(order, args.discount, args.taxInclusive);
        return {
            redeemableRewards,
            discountAmount
        }
    }
  },
});
