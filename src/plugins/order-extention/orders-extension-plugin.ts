import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { OrdersByVendorAdminResolver } from './api/order-entity.admin.resolver';
import { adminApiExtensions, shopApiExtensions } from './api/api-extention';
import { OrdersByVendorService } from './api/orders-by-vendor.service';
import { OrderShopResolver } from './api/order.shop.resolver';
import { CancelOrderResultResolver } from './api/cancel-order-result.resolver';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [OrdersByVendorService],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [OrdersByVendorAdminResolver]
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [OrderShopResolver, CancelOrderResultResolver]
  }
})
export class OrderExtentionPlugin {}