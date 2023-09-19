import gql from 'graphql-tag';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ProductEntityResolver } from './api/product-entity.resolver';
import { shopApiExtensions } from './api/api-extention';

@VendurePlugin({
  imports: [PluginCommonModule],
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [ProductEntityResolver]
  },
  configuration: (config)=>{
    config.customFields.Product.push({
      name: 'vendor',
      type: 'string',
    });

    config.customFields.Product.push({
      name: 'country_of_origin',
      type: 'string',
    });

    config.customFields.Product.push({
      name: 'manufacturer',
      type: 'string',
    });

    return config;
  }
})
export class ProductExtentionPlugin {}