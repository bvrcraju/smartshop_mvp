import { ResolveField, Resolver } from '@nestjs/graphql';

@Resolver('CancelOrderResult')
export class CancelOrderResultResolver {
  
  @ResolveField()
  __resolveType(value: any): string {
    return value.hasOwnProperty('code') ? 'Order' : value.
    __typename;
  }
}