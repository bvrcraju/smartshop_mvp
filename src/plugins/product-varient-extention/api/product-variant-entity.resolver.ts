import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ctx, RequestContext, ProductVariant, Channel, TransactionalConnection } from '@vendure/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
@Resolver('ProductVariant')
export class ProductVariantEntityResolver {
    constructor(
        private connection: TransactionalConnection,
    ) {}
    @ResolveField()
    async channels(@Ctx() ctx: RequestContext, @Parent() variant: ProductVariant): Promise<Channel[]> {
        const _variant = await this.connection.getRepository(ctx, ProductVariant).findOne(variant.id, {relations: ['channels'], withDeleted: true});
        const channels = _variant?.channels??[];
        return channels.filter(channel => channel.code !== DEFAULT_CHANNEL_CODE); 
    }
}