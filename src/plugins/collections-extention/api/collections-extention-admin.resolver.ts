import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Allow, ChannelService, Collection, CollectionService, Ctx, PaginatedList, RequestContext, Translated } from '@vendure/core';

import {
    Permission,
    QueryCollectionsArgs,
} from '@vendure/common/lib/generated-types';

@Resolver()
export class CollectionsExtentionAdminResolver {
    constructor(private collectionService: CollectionService,
        private channelService:ChannelService
        ) {}

    @Query()
    @Allow(Permission.ReadCatalog, Permission.ReadCollection)
    async globalCollections(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryCollectionsArgs,
    ): Promise<PaginatedList<Translated<Collection>>> {

        const channel = await this.channelService.getDefaultChannel();
        let adminContext: RequestContext = new RequestContext({
          apiType: "admin",
          isAuthorized: true,
          authorizedAsOwnerOnly: false,
          channel,
        });


        return this.collectionService.findAll(adminContext, args.options || undefined).then(res => {
            return res;
        });
    }
}