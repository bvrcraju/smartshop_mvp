import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { adminApiExtensions } from './api/api-extention';
import { CollectionsExtentionAdminResolver } from './api/collections-extention-admin.resolver';

@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
        schema: adminApiExtensions,
        resolvers: [CollectionsExtentionAdminResolver]
    }
})
export class CollectionsExtensionPlugin {}