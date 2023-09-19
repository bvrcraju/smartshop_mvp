import { Injectable } from "@nestjs/common";
import {
  AdministratorService,
  ChannelService,
  CountryService,
  CurrencyCode,
  EntityNotFoundError,
  ErrorResultUnion,
  ID,
  idsAreEqual,
  isGraphQlErrorResult,
  LanguageCode,
  ListQueryBuilder,
  PaginatedList,
  patchEntity,
  Permission,
  RequestContext,
  RoleService,
  TransactionalConnection,
  translateDeep,
} from "@vendure/core";
import { SupplierAddress } from "../entities/supplier-address.entity";
import { SupplierBankAccount } from "../entities/supplier-bank-account.entity";
import { Supplier } from "../entities/supplier.entity";
import {
  CreateSupplierAddressInput,
  CreateSupplierBankAccountInput,
  CreateSupplierInput,
  CreateSupplierResult,
  Success,
  SupplierList,
  UpdateSupplierAddressInput,
  UpdateSupplierBankAccountInput,
} from "../generated-admin-types";

@Injectable()
export class SupplierService {
  constructor(
    private connection: TransactionalConnection,
    private channelService: ChannelService,
    private roleService: RoleService,
    private adminService: AdministratorService,
    private countryService: CountryService,
    private listQueryBuilder: ListQueryBuilder
  ) {}

  async findAll(ctx: RequestContext): Promise<PaginatedList<Supplier>> {
    return this.listQueryBuilder
      .build(
        Supplier,
        {},
        {
          ctx,
          relations: ["addresses", "bankAccounts", "channel"],
        }
      )
      .getManyAndCount()
      .then(([items, totalItems]) => {
        return {
          items,
          totalItems,
        };
      });
  }

  findOne(ctx: RequestContext, supplierId: ID): Promise<Supplier | undefined> {
    const relations = ["addresses", "bankAccounts", "channel"];
    return this.connection.getEntityOrThrow(ctx, Supplier, supplierId, {
      relations,
    });
  }

  findOneByChannel(ctx:RequestContext ,channelId: ID): Promise<Supplier | undefined> {
    const relations = ["addresses", "bankAccounts", "channel"];
    return this.connection
        .getRepository(Supplier)
        .findOne({
            where: {
                "channel": {
                  id: channelId
                },
            },
            relations,
        });
}

  async createSupplier(
    ctx: RequestContext,
    input: CreateSupplierInput
  ): Promise<ErrorResultUnion<CreateSupplierResult, Supplier>> {
    const adminContext = ctx; //await this.getAdminContext();
    //create channel
    const result = await this.channelService.create(adminContext, {
      code: input.storeName.replace(/[&\/\\#,+()$~%.'":*?<>{} ]/g, ""),
      defaultLanguageCode: LanguageCode.en,
      pricesIncludeTax: true,
      currencyCode: CurrencyCode.INR,
      defaultShippingZoneId: "1",
      defaultTaxZoneId: "1",
      token: this.generateToken(),
    });

    if (isGraphQlErrorResult(result)) {
      return result;
    }

    const channelId = result.id;

    const superAdminRole = await this.roleService.getSuperAdminRole();
    const customerRole = await this.roleService.getCustomerRole();
    await this.roleService.assignRoleToChannel(
      adminContext,
      superAdminRole.id,
      channelId
    );
    await this.roleService.assignRoleToChannel(
      adminContext,
      customerRole.id,
      channelId
    );

    //create role for this channel
    const role = await this.roleService.create(adminContext, {
      code: result.code + "admin",
      description: result.code + "admin",
      channelIds: [channelId],
      permissions: [
        Permission.CreateAsset,
        Permission.ReadAsset,
        Permission.UpdateAsset,
        Permission.DeleteAsset,
        Permission.ReadCollection,
        Permission.ReadCustomerGroup,
        Permission.CreateOrder,
        Permission.ReadOrder,
        Permission.UpdateOrder,
        Permission.DeleteOrder,
        Permission.CreateProduct,
        Permission.ReadProduct,
        Permission.UpdateProduct,
        Permission.DeleteProduct,
        Permission.ReadShippingMethod,
        Permission.ReadTag,
        Permission.CreateTag,
        Permission.UpdateTag,
        Permission.DeleteTag,
        Permission.ReadTaxCategory,
        Permission.ReadTaxRate,
      ],
    });

    try {
      const nameFragment = input.contactPersonFullName.split(" ");
      const nameArrLength = nameFragment.length;
      //create admin for channel
      const admin = await this.adminService.create(adminContext, {
        emailAddress: input.emailAddress,
        password: input.password,
        firstName: nameFragment.slice(0, -1).join(" "),
        lastName: nameArrLength > 1 ? nameFragment[nameArrLength - 1] : "",
        roleIds: [role.id],
      });
    } catch (error) {
      await this.channelService.delete(adminContext, channelId);
      await this.roleService.delete(adminContext, role.id);
      throw new Error("Error creating supplier during admin creation flow");
    }
    const supplier = await this.connection
      .getRepository(Supplier)
      .save({ ...input });

    supplier.channel = result;
    await this.connection
      .getRepository(ctx, Supplier)
      .save(supplier, { reload: false });

    if (supplier) {
      for (let index = 0; index < input.addresses.length; index++) {
        // Get num of each fruit
        const address = input.addresses[index];
        await this.createAddress(adminContext, supplier.id, address);
      }

      for (let index = 0; index < input.bankAccounts.length; index++) {
        // Get num of each fruit
        const bankAccount = input.bankAccounts[index];
        await this.createBankAccount(adminContext, supplier.id, bankAccount);
      }
    }

    return await this.connection.getEntityOrThrow(ctx, Supplier, supplier.id, {
      where: { deletedAt: null },
      relations: ["addresses", "bankAccounts", "channel"],
    });
  }

  async createBankAccount(
    ctx: RequestContext,
    supplierId: ID,
    input: CreateSupplierBankAccountInput
  ): Promise<SupplierBankAccount> {
    const supplier = await this.connection.getEntityOrThrow(
      ctx,
      Supplier,
      supplierId,
      {
        where: { deletedAt: null },
        relations: ["bankAccounts"],
      }
    );

    const bankAccount = new SupplierBankAccount(input);

    const createdBankAccount = await this.connection
      .getRepository(ctx, SupplierBankAccount)
      .save(bankAccount);
    supplier.bankAccounts.push(createdBankAccount);
    await this.connection
      .getRepository(ctx, Supplier)
      .save(supplier, { reload: false });

    return createdBankAccount;
  }

  async updateBankAccount(
    ctx: RequestContext,
    input: UpdateSupplierBankAccountInput
  ): Promise<SupplierBankAccount> {
    const bankAccount = await this.connection.getEntityOrThrow(
      ctx,
      SupplierBankAccount,
      input.id,
      {
        relations: ["supplier"],
      }
    );
    const supplier = await this.connection.getEntityOrThrow<Supplier>(
      ctx,
      Supplier,
      bankAccount.supplier.id
    );
    if (!supplier) {
      throw new EntityNotFoundError("Address", input.id);
    }

    let updatedBankAccount = patchEntity(bankAccount, input);
    updatedBankAccount = await this.connection
      .getRepository(ctx, SupplierBankAccount)
      .save(updatedBankAccount);
    return updatedBankAccount;
  }

  async createAddress(
    ctx: RequestContext,
    supplierId: ID,
    input: CreateSupplierAddressInput
  ): Promise<SupplierAddress> {
    const supplier = await this.connection.getEntityOrThrow(
      ctx,
      Supplier,
      supplierId,
      {
        where: { deletedAt: null },
        relations: ["addresses"],
      }
    );

    const country = await this.countryService.findOneByCode(
      ctx,
      input.countryCode
    );
    const address = new SupplierAddress({
      ...input,
      country,
    });
    const createdAddress = await this.connection
      .getRepository(ctx, SupplierAddress)
      .save(address);
    supplier.addresses.push(createdAddress);
    await this.connection
      .getRepository(ctx, Supplier)
      .save(supplier, { reload: false });
    await this.enforceSingleDefaultAddress(ctx, createdAddress.id, input);
    return createdAddress;
  }

  async updateAddress(
    ctx: RequestContext,
    input: UpdateSupplierAddressInput
  ): Promise<SupplierAddress> {
    const address = await this.connection.getEntityOrThrow(
      ctx,
      SupplierAddress,
      input.id,
      {
        relations: ["supplier", "country"],
      }
    );
    const supplier = await this.connection.getEntityOrThrow<Supplier>(
      ctx,
      Supplier,
      address.supplier.id
    );
    if (!supplier) {
      throw new EntityNotFoundError("Address", input.id);
    }
    if (input.countryCode && input.countryCode !== address.country.code) {
      address.country = await this.countryService.findOneByCode(
        ctx,
        input.countryCode
      );
    } else {
      address.country = translateDeep(address.country, ctx.languageCode);
    }
    let updatedAddress = patchEntity(address, input);
    updatedAddress = await this.connection
      .getRepository(ctx, SupplierAddress)
      .save(updatedAddress);
    await this.enforceSingleDefaultAddress(ctx, input.id, input);
    return updatedAddress;
  }

  private async enforceSingleDefaultAddress(
    ctx: RequestContext,
    addressId: ID,
    input: CreateSupplierAddressInput | UpdateSupplierAddressInput
  ) {
    const result = await this.connection
      .getRepository(ctx, SupplierAddress)
      .findOne(addressId, { relations: ["supplier", "supplier.addresses"] });
    if (result) {
      const supplierAddressIds = result.supplier.addresses
        .map((a) => a.id)
        .filter((id) => !idsAreEqual(id, addressId)) as string[];

      if (supplierAddressIds.length) {
        if (input.defaultBillingAddress === true) {
          await this.connection
            .getRepository(ctx, SupplierAddress)
            .update(supplierAddressIds, {
              defaultBillingAddress: false,
            });
        }
        if (input.defaultShippingAddress === true) {
          await this.connection
            .getRepository(ctx, SupplierAddress)
            .update(supplierAddressIds, {
              defaultShippingAddress: false,
            });
        }
      }
    }
  }

  private generateToken(): string {
    const randomString = () => Math.random().toString(36).substr(3, 10);
    return `${randomString()}${randomString()}`;
  }

  private async getAdminContext(): Promise<RequestContext> {
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
