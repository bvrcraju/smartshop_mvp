import { Injectable } from '@nestjs/common';
import { ChannelService, ListQueryBuilder, Order, PaginatedList, RequestContext, LanguageCode, Logger, OrderService, ID, FulfillmentState, FulfillmentStateTransitionError } from '@vendure/core';
import {AddFulfillmentToOrderResult, FulfillOrderInput, OrderListOptions} from '@vendure/common/lib/generated-types';
import {ErrorResultUnion} from '@vendure/core';
import {Fulfillment} from '@vendure/core/dist/entity/fulfillment/fulfillment.entity';
@Injectable()
export class OrdersByVendorService {
    constructor(
        private listQueryBuilder: ListQueryBuilder,
        private channelService: ChannelService,
        private orderService: OrderService,
    ) {}

    async createFulfillmentByVendor(
        ctx: RequestContext,
        input: FulfillOrderInput,
    ): Promise<ErrorResultUnion<AddFulfillmentToOrderResult, Fulfillment>> {
        const channel = await this.channelService.getDefaultChannel();
        let adminContext: RequestContext = new RequestContext({
            apiType: 'admin',
            session: ctx.session,
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
        });
        return await this.orderService.createFulfillment(adminContext, input);
    }

    async transitionFulfillmentToStateByVendor(
        ctx: RequestContext,
        fulfillmentId: ID,
        state: FulfillmentState,
    ): Promise<Fulfillment | FulfillmentStateTransitionError> {
        const channel = await this.channelService.getDefaultChannel();
        let adminContext: RequestContext = new RequestContext({
            apiType: 'admin',
            session: ctx.session,
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
        });
        return await this.orderService.transitionFulfillmentToState(adminContext, fulfillmentId, state);
    }

    async findAll(ctx: RequestContext, options?: OrderListOptions): Promise<PaginatedList<Order>> { 
        const channel = await this.channelService.getDefaultChannel();
        let adminContext: RequestContext = new RequestContext({
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
        });

        return this.listQueryBuilder
            .build(Order, options, {
                relations: [
                    'lines',
                    'customer',
                    'lines.productVariant',
                    'lines.productVariant.channels',
                    'lines.items',
                    'lines.items.fulfillments',
                    'channels',
                    'shippingLines',
                    'shippingLines.shippingMethod',
                ],
                channelId: adminContext.channelId,
                customPropertyMap: {
                    customerLastName: 'customer.lastName',
                },
            })
            .andWhere(`"order__lines__productVariant__channels"."id" = :userChannelId`, { userChannelId: ctx.channelId })
            .getManyAndCount()
            .then(([items, totalItems]) => {
                return {
                    items,
                    totalItems,
                };
            });
    }
}