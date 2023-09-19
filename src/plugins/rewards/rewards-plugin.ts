import {
  CustomerEvent,
  EventBus,
  GlobalSettingsService,
  OrderStateTransitionEvent,
  PluginCommonModule,
  VendurePlugin,
} from "@vendure/core";
import { OnApplicationBootstrap } from "@nestjs/common";
import { RewardAuditEntry } from "./entities/reward-audit-entry.entity";
import { adminApiExtensions, shopApiExtensions } from "./api/api-extensions";
import { CustomerEntityResolver } from "./api/customer-entity.resolver";
import { RewardsAdminResolver } from "./api/reward-admin.resolver";
import { RewardsService } from "./api/rewards.service";
import { RewardsShopResolver } from "./api/reward-shop.resolver";
import { filter } from "rxjs/operators";
import {
  AdminRewardActivityType,
  AdminRewardRedumptionType,
  Discount,
  LoadRewardsInput,
  RedeemInput,
} from "./generated-admin-types";
import { discountWithRewardsCondition } from "./promotions/conditions/discount-with-rewards-condition";
import { discountWithRewardsAction } from "./promotions/actions/discount-with-rewards-action";
import { DiscountEntityResolver } from "./api/discount-entity.resolver";
@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [RewardAuditEntry],
  providers: [RewardsService],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [CustomerEntityResolver, RewardsAdminResolver, DiscountEntityResolver],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [CustomerEntityResolver, RewardsShopResolver, DiscountEntityResolver],
  },
  configuration: (config) => {
    config.promotionOptions.promotionConditions.push(
      discountWithRewardsCondition
    );
    config.promotionOptions.promotionActions.push(
      discountWithRewardsAction
    );
    config.customFields.GlobalSettings.push({
      name: "signupRewards",
      public: true,
      nullable: false,
      defaultValue: 1000,
      type: "int",
    });
    config.customFields.GlobalSettings.push({
      name: "spinWheelRewards",
      public: true,
      nullable: false,
      list: true,
      defaultValue: [5, 0, 50, 0, 10],
      type: "int",
    });
    config.customFields.GlobalSettings.push({
      name: "numberOfSpinsLimit",
      public: true,
      nullable: false,
      defaultValue: 1,
      type: "int",
    });
    config.customFields.GlobalSettings.push({
      name: "numberOfSpinsLimitFrequency",
      public: true,
      nullable: false,
      defaultValue: "1d",
      options: [
        {
          value: "1d",
        },
        {
          value: "1w",
        },
        {
          value: "1m",
        },
      ],
      type: "string",
    });

    config.customFields.GlobalSettings.push({
        name: "rewardTiers",
        nullable: false,
        public: true,
        list:true,
        type: "string",
        defaultValue: [
            "blue:0 - 10000",
            "silver:10001 - 50000",
            "gold:50001 - 100000",
            "platinum:100001 - 500000",
            "diamond:500001 - 1000000",
            "master:1000001 - 5000000"
        ]
    });

    config.customFields.GlobalSettings.push({
      name: "purchaseRewardsMutliplier",
      public: false,
      nullable: false,
      defaultValue: 1,
      type: "float",
    });
    config.customFields.GlobalSettings.push({
      name: "redeemRewardsMutliplier",
      public: false,
      nullable: false,
      defaultValue: 1,
      type: "float",
    });
    config.customFields.GlobalSettings.push({
      name: "minimumRewardsBalance",
      public: false,
      nullable: false,
      defaultValue: 1000,
      type: "int",
    });    

    config.customFields.Promotion.push({
      name: "isDefault",
      public: true,
      nullable: false,
      defaultValue: false,
      type: "boolean",
    });

    config.customFields.Promotion.push({
      name: "type",
      public: true,
      nullable: false,
      defaultValue: "none",
      options: [
        {value: "none"},
        {value: "discount"},
        {value: "discount-with-rewards"},
      ],
      type: "string",
    });


    return config;
  },
})
export class RewardsPlugin implements OnApplicationBootstrap {
  constructor(
    private eventBus: EventBus,
    private rewardsService: RewardsService,
    private globalSettingsService: GlobalSettingsService
  ) {}
  async onApplicationBootstrap() {
    this.eventBus
      .ofType(CustomerEvent)
      .pipe(filter((e) => e.type === "created"))
      .subscribe(async (event) => {
        const globalSettings = await this.globalSettingsService.getSettings(
          event.ctx
        );
        const loadRewadsInput: LoadRewardsInput = {
          customerId: event.customer.id,
          activity: AdminRewardActivityType.SIGNUP,
          rewards: globalSettings.customFields.signupRewards,
        };
        await this.rewardsService.loadRewards(event.ctx, loadRewadsInput);
      });

    this.eventBus
      .ofType(OrderStateTransitionEvent)
      .pipe(filter((event) => event.toState === "PaymentSettled"))
      .subscribe(async (event) => {
        if (!event.order.customer) {
          return;
        }
        const globalSettings = await this.globalSettingsService.getSettings(
          event.ctx
        );
        const loadRewadsInput: LoadRewardsInput = {
          customerId: event.order.customer.id,
          orderId: event.order.id,
          activity: AdminRewardActivityType.PURCHASE,
          rewards:
            Math.floor((event.order.totalWithTax/100)) *
            globalSettings.customFields.purchaseRewardsMutliplier,
        };
        await this.rewardsService.loadRewards(event.ctx, loadRewadsInput);

        //check if there are any discounts applied by trading rewards

        const discounts = event.order.discounts;

        discounts.forEach(async (discount: Discount) => {
          const rewards = await this.rewardsService.convertAmountToRewards(discount.amountWithTax);//discount.rewards;
          if (!event.order.customer) {
            return;
          }
          if (rewards && rewards < 0) {
            const reddemInput:RedeemInput ={
              customerId: event.order.customer.id,
              orderId: event.order.id,
              activity: AdminRewardRedumptionType.REDEEM,
              rewards: rewards,
            }
            await this.rewardsService.redeemRewards(event.ctx, reddemInput);          }
        });
      });
  }
}
