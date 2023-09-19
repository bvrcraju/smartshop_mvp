export type ActivityType = 'SIGNUP' | 'PURCHASE' | 'REFUND' | 'CANCEL' | 'REDEEM' | 'SPIN' | 'EXPIRED';

declare module '@vendure/core' {
    interface CustomGlobalSettingsFields {
        signupRewards: number;
        spinWheelRewards: number[];
        numberOfSpinsLimit: number;
        numberOfSpinsLimitFrequency: string;
        purchaseRewardsMutliplier: number;
        redeemRewardsMutliplier: number;
        rewardTiers: string[];
        minimumRewardsBalance: number;
    }

    interface CustomPromotionFields {
        isDefault: boolean;
        type: string;
    }

    // interface NextTier {
    //     tier: string;
    //     min: number;
    // }
}