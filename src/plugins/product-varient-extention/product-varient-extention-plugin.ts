import gql from 'graphql-tag';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { ProductVariantEntityResolver } from './api/product-variant-entity.resolver';
import { shopApiExtensions } from './api/api-extention';

@VendurePlugin({
  imports: [PluginCommonModule],
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [ProductVariantEntityResolver]
  },
  configuration: (config) => {

    config.customFields.ProductVariant.push({
      name: "originalPriceWithTax",
      type: "int",
    });

    config.customFields.ProductVariant.push({
      name: "costPrice",
      type: "int",
    });

    config.customFields.ProductVariant.push({
      name: "dimension_length",
      type: "float",
    });
    config.customFields.ProductVariant.push({
      name: "dimension_length_unit",
      type: "string",
      options: [
        {value: "mm"},
        {value: "cm"},
        {value: "m"},
        {value: "inch"},
        {value: "ft"},
      ]
    });

    config.customFields.ProductVariant.push({
      name: "dimension_breadth",
      type: "float",
    });
    config.customFields.ProductVariant.push({
      name: "dimension_breadth_unit",
      type: "string",
      options: [
        {value: "mm"},
        {value: "cm"},
        {value: "m"},
        {value: "inch"},
        {value: "ft"},
      ]
    });

    config.customFields.ProductVariant.push({
      name: "dimension_height",
      type: "float",
    });
    config.customFields.ProductVariant.push({
      name: "dimension_height_unit",
      type: "string",
      options: [
        {value: "mm"},
        {value: "cm"},
        {value: "m"},
        {value: "inch"},
        {value: "ft"},
      ]
    });

    config.customFields.ProductVariant.push({
      name: "dimension_weight",
      type: "float",
    });
    config.customFields.ProductVariant.push({
      name: "dimension_weight_unit",
      type: "string",
      options: [
        {value: "g"},
        {value: "kg"},
        {value: "oz"},
        {value: "lb"}
      ]
    });


    return config;
  }
})
export class ProductVarientExtentionPlugin {}