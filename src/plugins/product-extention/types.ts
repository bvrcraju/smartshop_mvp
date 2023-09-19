import {} from '@vendure/core';
declare module '@vendure/core' {
  export interface CustomProductFields {
    vendor: string;
    manufacturer: string;
    country_of_origin: string;
  }
}