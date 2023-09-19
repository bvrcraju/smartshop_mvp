import { PluginCommonModule, RuntimeVendureConfig, VendurePlugin } from '@vendure/core';

import { PLUGIN_INIT_OPTIONS } from './constants';
export interface PayuPluginOptions {
    host: string;
}