import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Ctx, RequestContext, Product, ProductService, Channel } from '@vendure/core';
import { DEFAULT_CHANNEL_CODE } from '@vendure/common/lib/shared-constants';
@Resolver('Product')
export class ProductEntityResolver {
    constructor(private productService: ProductService) {}
    @ResolveField()
    async channels(@Ctx() ctx: RequestContext, @Parent() product: Product): Promise<Channel[]> {
        const channels = await this.productService.getProductChannels(ctx, product.id);
        return channels.filter(channel => channel.code !== DEFAULT_CHANNEL_CODE);
    }
}