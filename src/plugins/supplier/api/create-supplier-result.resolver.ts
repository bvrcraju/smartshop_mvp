import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('CreateSupplierResult')
export class CreateSupplierResultResolver {
  
  @ResolveField()
  __resolveType(value: any): string {
    return value.hasOwnProperty('storeName') ? 'Supplier' : 'LanguageNotAvailableError';
  }
}