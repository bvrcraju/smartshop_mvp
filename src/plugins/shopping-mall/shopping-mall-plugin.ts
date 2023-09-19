import {
  PluginCommonModule,
  VendurePlugin,
} from "@vendure/core";
import { shopApiExtensions, adminApiExtensions } from "./api/api-extensions";
import { CustomerEntityResolver } from "./api/customer-entity.resolver";
import { MallService } from "./api/mall.service";
import { ShoppingMallAdminResolver } from "./api/shopping-mall-admin.resolver";
import { ShoppingMallShopResolver } from "./api/shopping-mall-shop.resolver";
import { MallEntry } from "./entities/mall-entry.entity";
import { ShoppingMall } from "./entities/shopping-mall.entity";
@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [ShoppingMall, MallEntry],
  providers: [MallService],
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [CustomerEntityResolver, ShoppingMallShopResolver],
  },
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [CustomerEntityResolver, ShoppingMallAdminResolver],
  },
  configuration: (config) => {
    config.customFields.Channel.push({
      name: "featuredMall",
      type: "relation",
      entity: ShoppingMall,
      // may be omitted if the entity name matches the GraphQL type name,
      // which is true for all built-in entities.
      // graphQLType: "Asset",
      // Whether to "eagerly" load the relation
      // See https://typeorm.io/#/eager-and-lazy-relations
      eager: false,
    });

    
    return config;
  },
})
export class ShoppingMallPlugin {}
