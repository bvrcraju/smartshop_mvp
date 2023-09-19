import { PluginCommonModule, RuntimeVendureConfig, VendurePlugin } from '@vendure/core';

import { PLUGIN_INIT_OPTIONS } from './constants';
import { PayuController } from './payu.controller';
import { payuPaymentHandler } from './payu.handler';

/**
 * @description
 * Configuration options for the Mollie payments plugin.
 *
 * @docsCategory payments-plugin
 * @docsPage MolliePlugin
 */
export interface PayuPluginOptions {
    /**
     * @description
     * The host of your storefront application, e.g. `'https://my-shop.com'`
     */
    host: string;
}
@VendurePlugin({
    imports: [PluginCommonModule],
    controllers: [PayuController],
    providers: [{ provide: PLUGIN_INIT_OPTIONS, useFactory: () => PayUPlugin.options }],
    configuration: (config: RuntimeVendureConfig) => {
        config.paymentOptions.paymentMethodHandlers.push(payuPaymentHandler);
        return config;
    },
})
export class PayUPlugin {
    static options: PayuPluginOptions;

    /**
     * @description
     * Initialize the payu payment plugin
     * @param vendureHost is needed to pass to payu for callback
     */
    static init(options: PayuPluginOptions): typeof PayUPlugin {
        this.options = options;
        return PayUPlugin;
    }
}
