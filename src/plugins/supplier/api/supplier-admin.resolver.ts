import { Args, Mutation, Query, Resolver, ResolveField } from "@nestjs/graphql";
import { Allow, Ctx, ErrorResultUnion, PaginatedList, Permission, RequestContext, Transaction } from "@vendure/core";
import { Supplier } from "../entities/supplier.entity";
import { CreateSupplierInput, CreateSupplierResult, QuerysupplierArgs, QuerysupplierByChannelArgs, SupplierList } from "../generated-admin-types";
import { SupplierService } from "./supplier.service";

@Resolver()
export class SupplierAdminResolver {
  constructor(private supplierService: SupplierService) {}

  @Transaction()
  @Mutation()
  @Allow(Permission.SuperAdmin)
  async registerSupplierAccount(@Ctx() ctx: RequestContext, @Args('input') input: CreateSupplierInput): Promise<ErrorResultUnion<CreateSupplierResult, Supplier>> {
      return this.supplierService.createSupplier(ctx, input);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async suppliers(@Ctx() ctx: RequestContext): Promise<PaginatedList<Supplier>> {
      return this.supplierService.findAll(ctx);
  }

  @Query()
  @Allow(Permission.SuperAdmin)
  async supplier(@Ctx() ctx: RequestContext, @Args() args:QuerysupplierArgs): Promise<Supplier | undefined> {
      return this.supplierService.findOne(ctx, args.id);
  }

  @Query()
  @Allow(Permission.SuperAdmin, Permission.Owner)
  async supplierByChannel(@Ctx() ctx: RequestContext, @Args() args:QuerysupplierByChannelArgs): Promise<Supplier | undefined> {
      return this.supplierService.findOneByChannel(ctx, args.channelId);
  }

}
