import { Injectable } from "@nestjs/common";
import {
  ChannelService,
  Customer,
  GlobalSettingsService,
  ID,
  LanguageCode,
  Order,
  Promotion,
  RequestContext,
  TransactionalConnection,
} from "@vendure/core";
import { RewardAuditEntry } from "../entities/reward-audit-entry.entity";
import { LoadRewardsInput, RedeemInput } from "../generated-admin-types";
import { SpinWheelRewardSettings, NextTier } from "../generated-shop-types";

@Injectable()
export class RewardsService {
  constructor(
    private connection: TransactionalConnection,
    private channelService: ChannelService,
    private globalSettings: GlobalSettingsService
  ) {}

  async getSpinWheelRewardSettings(
    ctx: RequestContext
  ): Promise<SpinWheelRewardSettings> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });
    const settings = await this.globalSettings.getSettings(adminContext);
    return {
      spinWheelRewards: settings.customFields.spinWheelRewards,
      numberOfSpinsLimit: settings.customFields.numberOfSpinsLimit,
      numberOfSpinsLimitFrequency:
        settings.customFields.numberOfSpinsLimitFrequency,
    };
  }

  async getRewardsBalance(customer: Customer): Promise<number> {
    let qb = this.connection.rawConnection
      .createQueryBuilder()
      .select('SUM("rewards")', "balance")
      .from(RewardAuditEntry, "rewardsEntry")
      .where("rewardsEntry.customer = :customerId", {
        customerId: customer.id,
      });
    let result: any = await qb.getRawOne();
    return result.balance || 0;
  }

  async getRewardsTier(customer: Customer): Promise<string> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });
    const settings = await this.globalSettings.getSettings(adminContext);
    const rewardTiers = settings.customFields.rewardTiers;
    let rewardsTiersObj = [] as any;

    rewardTiers.forEach((tier) => {
      let split_1 = tier.split(":");
      let split_2 = split_1[1].split("-");
      let tierString = split_1[0].trim();
      rewardsTiersObj.push({
        tier: tierString,
        min: Number(split_2[0].trim()),
        max: Number(split_2[1].trim()),
      });
    });

    const balance = await this.getRewardsBalance(customer);

    for (let i = 0; i < rewardsTiersObj.length; i++) {
      if (
        balance >= rewardsTiersObj[i].min &&
        balance <= rewardsTiersObj[i].max
      ) {
        return rewardsTiersObj[i].tier;
      }
    }
    return "blue";
  }

  async getNextRewardTier(customer: Customer): Promise<NextTier> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });
    const settings = await this.globalSettings.getSettings(adminContext);
    const rewardTiers = settings.customFields.rewardTiers;
    const currentTier = await this.getRewardsTier(customer);
    let nextTier = {} as NextTier;
    rewardTiers.filter((tier, index) => {
      let split_1 = tier.split(":");
      let tierString = split_1[0].trim();
      if (tierString === currentTier && index < rewardTiers.length - 1) {
        let tempNextTier = rewardTiers[index + 1];
        let temp_split_1 = tempNextTier.split(":");
        let temp_split_2 = temp_split_1[1].split("-");
        let temp_tierString = temp_split_1[0].trim();
        nextTier = {
          tier: temp_tierString,
          min: Number(temp_split_2[0].trim()),
        };
        return true;
      }
    });
    return nextTier;
  }

  async getRemainingSpins(customer: Customer): Promise<number> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });

    const settings = await this.globalSettings.getSettings(adminContext);
    const numberOfSpinsLimit = settings.customFields.numberOfSpinsLimit;
    const numberOfSpinsLimitFrequency =
      settings.customFields.numberOfSpinsLimitFrequency;

    const qb = await this.connection
      .getRepository(RewardAuditEntry)
      .createQueryBuilder("rewardAuditEntry")
      .select("COUNT(rewardAuditEntry.id)", "count")
      .where("rewardAuditEntry.customerId = :customerId", {
        customerId: customer.id,
      })
      .andWhere("rewardAuditEntry.activity = :activity", { activity: "SPIN" });

    if (numberOfSpinsLimitFrequency === "1d") {
      const dayCondition = `date_trunc('day', "createdAt") = date_trunc('day',CURRENT_TIMESTAMP)`;
      qb.andWhere(dayCondition);
    } else if (numberOfSpinsLimitFrequency === "1w") {
      const weekCondition = `date_trunc('week', "createdAt") = date_trunc('week',CURRENT_TIMESTAMP)`;
      qb.andWhere(weekCondition);
    } else if (numberOfSpinsLimitFrequency === "1m") {
      const monthCondition = `date_trunc('month', "createdAt") = date_trunc('month',CURRENT_TIMESTAMP)`;
      qb.andWhere(monthCondition);
    } else {
      // no limit
    }
    const rewardAuditEntries = await qb.getRawOne();
    const spins = rewardAuditEntries.count;
    const limit = numberOfSpinsLimit;
    const remainingSpins = limit - spins;
    return remainingSpins < 0 ? 0 : remainingSpins;
  }

  async addSpinRewardsToCustomer(
    customer: Customer,
    rewards: number
  ): Promise<Customer> {
    const remainingSpins = await this.getRemainingSpins(customer);

    if (remainingSpins <= 0) {
      return customer;
    }

    const rewardAuditEntry = new RewardAuditEntry({
      activity: "SPIN",
      customer,
      rewards,
    });
    await this.connection
      .getRepository(RewardAuditEntry)
      .save(rewardAuditEntry);
    return customer;
  }

  async redeemRewards(
    ctx: RequestContext,
    input: RedeemInput
  ): Promise<Customer> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });

    const rewardAuditEntry = new RewardAuditEntry(input);
    if (input.orderId) {
      const order = await this.connection.getEntityOrThrow(
        adminContext,
        Order,
        input.orderId
      );
      rewardAuditEntry.order = order;
    }

    const customer = await this.connection.getEntityOrThrow(
      adminContext,
      Customer,
      input.customerId
    );
    rewardAuditEntry.customer = customer;

    await this.connection
      .getRepository(RewardAuditEntry)
      .save(rewardAuditEntry);
    return customer;
  }

  async loadRewards(
    ctx: RequestContext,
    input: LoadRewardsInput
  ): Promise<Customer> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });

    const rewardAuditEntry = new RewardAuditEntry(input);
    if (input.orderId) {
      const order = await this.connection.getEntityOrThrow(
        adminContext,
        Order,
        input.orderId
      );
      rewardAuditEntry.order = order;
    }

    const customer = await this.connection.getEntityOrThrow(
      adminContext,
      Customer,
      input.customerId
    );
    rewardAuditEntry.customer = customer;

    await this.connection
      .getRepository(RewardAuditEntry)
      .save(rewardAuditEntry);
    return customer;
  }

  async getMinimumRewardsBalance(): Promise<number> {
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });
    const settings = await this.globalSettings.getSettings(adminContext);
    return settings.customFields.minimumRewardsBalance;
  }

  async getRedeemableRewardsOnOrder(
    order: Order,
    discountPercentage: Number,
    taxInclusive: Boolean
  ): Promise<{ redeemableRewards: Number | null; discountAmount: Number }> {
    if (!order.customer) {
      throw new Error("Order does not have a customer");
    }
    const channel = await this.channelService.getDefaultChannel();
    let adminContext: RequestContext = new RequestContext({
      apiType: "admin",
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
      channel,
      languageCode: LanguageCode.en,
    });
    const settings = await this.globalSettings.getSettings(adminContext);

    const redeemRewardsMutliplier =
      settings.customFields.redeemRewardsMutliplier;
    const minimumRewardsBalance = settings.customFields.minimumRewardsBalance;

    const customerRewardBalance = await this.getRewardsBalance(order.customer);

    const orderTotal = taxInclusive ? order.subTotalWithTax : order.subTotal;

    const discountAmount =
      Number(orderTotal) * (Number(discountPercentage) / 100);

    const rewardsNeeded = await this.convertAmountToRewards(discountAmount, redeemRewardsMutliplier);

    if (rewardsNeeded > customerRewardBalance - minimumRewardsBalance) {
      return {
        redeemableRewards: null,
        discountAmount: 0,
      };
    }

    return {
      redeemableRewards: rewardsNeeded,
      discountAmount: rewardsNeeded * redeemRewardsMutliplier * 100,
    };
  }

  async isCustomerHavingRewardsToRedeemOnOrder(
    order: Order,
    discountPercentage: Number,
    taxInclusive: Boolean
  ): Promise<Boolean> {
    const customer = order.customer;
    if (!customer) {
      throw new Error("Order does not have a customer");
    }
    const { redeemableRewards } = await this.getRedeemableRewardsOnOrder(
      order,
      discountPercentage,
      taxInclusive
    );
    if (redeemableRewards === null) {
      return false;
    }

    const customerRewardBalance = await this.getRewardsBalance(customer);
    const minimumRewardsBalance = await this.getMinimumRewardsBalance();
    return customerRewardBalance - minimumRewardsBalance >= redeemableRewards;
  }

  async convertAmountToRewards(
    amount: number,
    redeemRewardsMutliplier?: number,
    ctx?: RequestContext
  ): Promise<number> {
    if (!redeemRewardsMutliplier) {
        if (!ctx) {
          const channel = await this.channelService.getDefaultChannel();
          ctx = new RequestContext({
            apiType: "admin",
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
          });
        }
        const settings = await this.globalSettings.getSettings(ctx);
        redeemRewardsMutliplier = settings.customFields.redeemRewardsMutliplier;
      }
      return Math.floor(
        (amount / 100) * (1 / redeemRewardsMutliplier)
      );;
  }

  async convertRewardsToAmount(
    rewards: number,
    redeemRewardsMutliplier?: number,
    ctx?: RequestContext
  ): Promise<number> {
    if (!redeemRewardsMutliplier) {
      if (!ctx) {
        const channel = await this.channelService.getDefaultChannel();
        ctx = new RequestContext({
          apiType: "admin",
          isAuthorized: true,
          authorizedAsOwnerOnly: false,
          channel,
          languageCode: LanguageCode.en,
        });
      }
      const settings = await this.globalSettings.getSettings(ctx);
      redeemRewardsMutliplier = settings.customFields.redeemRewardsMutliplier;
    }
    return rewards * redeemRewardsMutliplier * 100;
  }

  async getDefaultPromotions(customer: Customer): Promise<Promotion[]> {
    const promotions = await this.connection.getRepository(Promotion).find({
    });
    return promotions.filter((promotion) => promotion.customFields.isDefault);
  }
}
