import { gql } from 'apollo-server-core';

export const shopApiExtensions = gql`
    input CancelOrderInput {
        "The id of the order to be cancelled"
        orderId: ID!
        reason: String
    }

    "Returned if no OrderLines have been specified for the operation"
    type EmptyOrderLineSelectionError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }
    "Returned if the specified quantity of an OrderLine is greater than the number of items in that line"
    type QuantityTooGreatError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    "Returned if an operation has specified OrderLines from multiple Orders"
    type MultipleOrderError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
    }

    "Returned if an attempting to cancel lines from an Order which is still active"
    type CancelActiveOrderError implements ErrorResult {
        errorCode: ErrorCode!
        message: String!
        orderState: String!
    }


    union CancelOrderResult =
      Order
    | EmptyOrderLineSelectionError
    | QuantityTooGreatError
    | MultipleOrderError
    | CancelActiveOrderError
    | OrderStateTransitionError

    extend type Mutation{
        cancelOrder(input: CancelOrderInput!): CancelOrderResult!
    }
`;

export const adminApiExtensions = gql`
    extend type Query {
        vendorOrders(options: OrderListOptions): OrderList!
    }
    extend type Mutation {
        addFulfillmentToOrderByVendor(input: FulfillOrderInput!): AddFulfillmentToOrderResult!
        transitionFulfillmentToStateByVendor(id: ID!, state: String!): TransitionFulfillmentToStateResult!
    }
`;