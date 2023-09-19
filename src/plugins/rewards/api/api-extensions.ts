import { gql } from 'apollo-server-core';

export const commonApiExtensions = gql`
    type RewardAuditEntry implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        customer: Customer!
        activity: String!
        order: Order
        rewards: Int!
        note: String
    }

    type NextTier{
        tier: String
        min: Int
    }

    enum AdminRewardActivityType{
        SIGNUP
        PURCHASE
        SPIN
    }

    enum AdminRewardRedumptionType{
        REFUND
        CANCEL
        REDEEM
    }

    extend type Customer {
        rewardsBalance: Int!
        rewardsTier: String!
        avialableSpins: Int!
        nextRewardsTier: NextTier!
        defaultPromotions: [Promotion!]!
    }

    extend type Discount{
        rewards: Int
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}
    input SpinRewardsInput {
        rewards: Int!
    }
    extend type Mutation{
        addSpinRewardsToActiveCustomer(input: SpinRewardsInput!):Customer
        applyDefaultPromotions: Success!
        removeDefaultPromotions: Success!
    }

    type SpinWheelRewardSettings{
        spinWheelRewards: [Int!]!
        numberOfSpinsLimit: Int
        numberOfSpinsLimitFrequency: String!     
    }
    extend type Query{
        spinWheelRewardSettings: SpinWheelRewardSettings!
    }
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}
    input LoadRewardsInput {
        customerId: ID!,
        orderId: ID,
        activity: AdminRewardActivityType!,
        note: String,
        rewards: Int!,
    }
    input RedeemInput {
        customerId: ID!,
        orderId: ID,
        activity: AdminRewardRedumptionType!,
        note: String,
        rewards: Int!,
    }
    
    extend type Mutation {
        loadRewards(input: LoadRewardsInput!): Customer!
        redeemRewards(input: RedeemInput!): Customer!
    }
`;