import { LanguageCode } from '@vendure/common/lib/generated-types';
import {
    CreatePaymentErrorResult,
    CreatePaymentResult,
    CreateRefundResult,
    Logger,
    PaymentMethodHandler,
    PaymentMethodService,
    SettlePaymentResult,
} from '@vendure/core';

import { loggerCtx, PLUGIN_INIT_OPTIONS } from './constants';
import { PayuPluginOptions } from './payu.plugin';

let paymentMethodService: PaymentMethodService;
let options: PayuPluginOptions;
export const payuPaymentHandler = new PaymentMethodHandler({
    code: 'payu-payment-handler',
    description: [
        {
            languageCode: LanguageCode.en,
            value: 'Payu Payment Handler',
        },
    ],
    args: {
        gateWayUrl: {
            type: 'string',
            label: [{ languageCode: LanguageCode.en, value: 'Gateway URL' }],
        },
        merchantKey: {
            type: 'string',
            label: [{ languageCode: LanguageCode.en, value: 'Merchant Key' }],
        },
        merchantSalt: {
            type: 'string',
            label: [{ languageCode: LanguageCode.en, value: 'Merchant Salt' }],
        }
    },
    init(injector) {
        paymentMethodService = injector.get(PaymentMethodService);
        options = injector.get(PLUGIN_INIT_OPTIONS);
    },
    createPayment: async (
        ctx,
        order,
        amount,
        args,
        _metadata,
    ): Promise<CreatePaymentResult | CreatePaymentErrorResult> => {
        try {
            const { gateWayUrl, merchantKey, merchantSalt } = args;
            const paymentMethods = await paymentMethodService.findAll(ctx);
            const paymentMethod = paymentMethods.items.find(
                pm =>
                    pm.handler.args.find(arg => arg.value === gateWayUrl) &&
                    pm.handler.args.find(arg => arg.value === merchantKey) && 
                    pm.handler.args.find(arg => arg.value === merchantSalt),
            );
            if (!paymentMethod) {
                throw Error(`No paymentMethod found for given payu config`); // This should never happen
            }
            const host = options.host.endsWith('/')
                ? options.host.slice(0, -1)
                : options.host; 
            return {
                amount: order.totalWithTax,
                transactionId: order.code,
                state: 'Authorized' as const,
                metadata: {
                    public: {
                        webhookUrl: `${host}/payments/payu/checkout/${order.code}/${ctx.channel.token}/${paymentMethod.id}`,
                    },
                },
            };
        } catch (err:any) {
            Logger.error(err, loggerCtx);
            return {
                amount: order.totalWithTax,
                state: 'Error',
                errorMessage: err.message,
            };
        }
    },
    settlePayment: async (order, payment, args): Promise<SettlePaymentResult> => {
        // Settlement is handled by incoming webhook in mollie.controller.ts
        return { success: true };
    },
    createRefund: async (ctx, input, amount, order, payment, args): Promise<CreateRefundResult> => {
        return {
            state: 'Settled',
            transactionId: payment.transactionId,
        };
    },
});
