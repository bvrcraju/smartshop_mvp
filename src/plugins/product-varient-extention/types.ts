import {} from '@vendure/core';
declare module '@vendure/core' {
  export interface CustomProductVariantFields {
    originalPriceWithTax: number;
    costPrice: number;
    dimension_length: number;
    dimension_length_unit: string;
    dimension_breadth: number;
    dimension_breadth_unit: string;
    dimension_height: number;
    dimension_height_unit: string;
    dimension_weight: number;
    dimension_weight_unit: string;
  }
}