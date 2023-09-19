import { gql } from 'apollo-server-core';

export const commonApiExtensions = gql`
    type ShoppingMall implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        name: String!
        address: String!
        city: String!
        state: String!
        postalCode: String!
        bannerImage: Asset
    }

    type MallEntry implements Node {
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        customer: Customer!
        mall: ShoppingMall
        checkedInAt: DateTime!
        checkedOutAt: DateTime
    }

    type ShoppingMallList implements PaginatedList {
        items: [ShoppingMall!]!
        totalItems: Int!
    }
    
    extend type Customer {
        activeMall: MallEntry
    }
`;

export const shopApiExtensions = gql`
    ${commonApiExtensions}

    input ShopingMallListOptions {
        lat: Float!, 
        lng: Float!, 
        radius: Int!
    }

    input MallCheckInInput {
        mallId: Int!
    }

    extend type Mutation{
        checkInIntoMall(input: MallCheckInInput!):MallEntry
        checkOutOfMall: MallEntry
    }
    extend type Query{
        getNearbyMalls(options: ShopingMallListOptions):ShoppingMallList!
    }
`;

export const adminApiExtensions = gql`
    ${commonApiExtensions}

    input ShoppingMallInput {
        name: String!
        address: String!
        city: String!
        state: String!
        postalCode: String!
    }

    input ShoppingMallLinkInput{
        mallId: ID!
        channelId: ID!
    }

    extend type Mutation{
        createShoppingMall(input: ShoppingMallInput!):ShoppingMall
        linkShoppingMallToChannelById(input: ShoppingMallLinkInput!):ShoppingMall
    }

    extend type Query{
        getShoppingMallById(id: ID!):ShoppingMall
        getShoppingMalls:ShoppingMallList!
    }
`;