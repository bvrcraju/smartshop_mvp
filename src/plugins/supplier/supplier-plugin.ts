import {
    Asset,
    ChannelEvent,
    ChannelService,
    EventBus,
    Facet,
    FacetEvent,
    FacetService,
    FacetValue,
    FacetValueEvent,
    FacetValueService,
    LanguageCode,
    PluginCommonModule,
    ProductVariantEvent,
    ProductVariantPrice,
    RequestContext,
    TransactionalConnection,
    VendurePlugin,
  } from "@vendure/core";

  import { OnApplicationBootstrap } from "@nestjs/common";
  import { filter } from "rxjs/operators";
import { Supplier } from "./entities/supplier.entity";
import { SupplierAddress } from "./entities/supplier-address.entity";
import { SupplierBankAccount } from "./entities/supplier-bank-account.entity";
import { adminApiExtensions } from "./api/api-extension";
import { SupplierService } from "./api/supplier.service";
import { SupplierAdminResolver } from "./api/supplier-admin.resolver";
import { CreateSupplierResultResolver } from "./api/create-supplier-result.resolver";

  @VendurePlugin({
    imports: [PluginCommonModule],
    entities: [Supplier, SupplierAddress, SupplierBankAccount],
    providers: [SupplierService],
    adminApiExtensions: {
      schema: adminApiExtensions,
      resolvers: [SupplierAdminResolver, CreateSupplierResultResolver],
    },
    configuration: (config) => {
      config.customFields.Channel.push({
        name: "address",
        type: "text",
      });
  
      config.customFields.Channel.push({
        name: "note",
        type: "text",
      });
  
      config.customFields.Channel.push({
        name: "bannerImage",
        type: "relation",
        entity: Asset,
        // may be omitted if the entity name matches the GraphQL type name,
        // which is true for all built-in entities.
        // graphQLType: "Asset",
        // Whether to "eagerly" load the relation
        // See https://typeorm.io/#/eager-and-lazy-relations
        eager: false,
      });
  
      config.customFields.Channel.push({
        name: "icon",
        type: "relation",
        entity: Asset,
        // may be omitted if the entity name matches the GraphQL type name,
        // which is true for all built-in entities.
        graphQLType: "Asset",
        // Whether to "eagerly" load the relation
        // See https://typeorm.io/#/eager-and-lazy-relations
        eager: false,
      });
      return config;
    },
  })
  export class SupplierPlugin implements OnApplicationBootstrap {
    constructor(
      private eventBus: EventBus,
      private facetService: FacetService,
      private facetValueService: FacetValueService,
      private channelService: ChannelService,
      private connection: TransactionalConnection
    ) {}
    async onApplicationBootstrap() {
      const ctx = await this.createContext();
      this.eventBus
        .ofType(FacetEvent)
        .pipe(filter((e) => e.type === "created"))
        .subscribe(async (e) => {
          e.entity.channels = await this.channelService.findAll(ctx);
          await this.facetService.update(ctx, e.entity);
        });
  
      this.eventBus
        .ofType(FacetValueEvent)
        .pipe(filter((e) => e.type === "created"))
        .subscribe(async (e) => {
          e.entity.channels = await this.channelService.findAll(ctx);
          await this.facetValueService.update(ctx, e.entity);
        });
  
      this.eventBus
        .ofType(ProductVariantEvent)
        .pipe(filter((e) => e.type === "updated"))
        .subscribe(async (e) => {
          const adminContext = await this.createContext();
          e.entity.forEach(async (variant) => {
            const variantPriceRepository = this.connection.getRepository(
              ctx,
              ProductVariantPrice
            );
            const variantPrice = await variantPriceRepository.findOne({
              where: {
                variant: variant.id,
                channelId: adminContext.channelId,
              },
            });
            if (variantPrice && variantPrice.price != variant.priceWithTax) {
              variantPrice.price = variant.priceWithTax;
              await variantPriceRepository.save(variantPrice);
            }
          });
        });
  
      this.eventBus
        .ofType(ChannelEvent)
        .pipe(filter((e) => e.type === "created"))
        .subscribe(async (e) => {
          const facets = await this.facetService.findAll(ctx);
          const channels = await this.channelService.findAll(ctx);
          const facetValues = await this.facetValueService.findAll(
            LanguageCode.en
          );
  
          for (let facet of facets.items) {
            (facet as Facet).channels = channels;
            await this.facetService.update(ctx, facet);
          }
  
          for (let facetValue of facetValues) {
            (facetValue as FacetValue).channels = channels;
            await this.facetValueService.update(ctx, facetValue);
          }
        });
    }
    private async createContext(): Promise<RequestContext> {
      const channel = await this.channelService.getDefaultChannel();
      return new RequestContext({
        apiType: "admin",
        isAuthorized: true,
        authorizedAsOwnerOnly: false,
        channel,
        languageCode: LanguageCode.en,
      });
    }
  }
  