import { Injectable } from "@nestjs/common";
import { HistoryEntryType } from "@vendure/common/lib/generated-types";
import {
  ChannelService,
  Customer,
  CustomerEvent,
  CustomerService,
  EventBus,
  ExternalAuthenticationMethod,
  HistoryService,
  RequestContext,
  RoleService,
  TransactionalConnection,
  User,
} from "@vendure/core";
/**
 * @description
 * This is a helper service which exposes methods related to looking up and creating Users based on an
 * external {@link AuthenticationStrategy}.
 *
 * @docsCategory auth
 */
@Injectable()
export class ExternalFirebaseAuthenticationService {
  constructor(
    private connection: TransactionalConnection,
    private roleService: RoleService,
    private historyService: HistoryService,
    private customerService: CustomerService,
    private channelService: ChannelService,
    private eventBus: EventBus
  ) {}
  /**
   * @description
   * Looks up a User based on their identifier from an external authentication
   * provider, ensuring this User is associated with a Customer account.
   */
  async findCustomerUser(
    ctx: RequestContext,
    strategy: string,
    externalIdentifier: string
  ): Promise<User | undefined> {
    const user = await this.findUser(ctx, strategy, externalIdentifier);

    if (user) {
      // Ensure this User is associated with a Customer
      const customer = await this.customerService.findOneByUserId(ctx, user.id);
      if (customer) {
        return user;
      }
    }
  }

  /**
   * @description
   * If a customer has been successfully authenticated by an external authentication provider, yet cannot
   * be found using `findCustomerUser`, then we need to create a new User and
   * Customer record in Vendure for that user. This method encapsulates that logic as well as additional
   * housekeeping such as adding a record to the Customer's history.
   */
  async createCustomerAndUser(
    ctx: RequestContext,
    config: {
      strategy: string;
      externalIdentifier: string;
      verified: boolean;
      phoneNumber: string;
      emailAddress: string;
      firstName: string;
      lastName: string;
    }
  ): Promise<User> {
    let user: User;

    const existingUser = await this.findExistingCustomerUserByPhoneNuber(
      ctx,
      config.phoneNumber
    );

    if (existingUser) {
      user = existingUser;
    } else {
      const customerRole = await this.roleService.getCustomerRole();
      user = new User({
        identifier: config.phoneNumber,
        roles: [customerRole],
        verified: config.verified || false,
        authenticationMethods: [],
      });
    }
    const authMethod = await this.connection
      .getRepository(ctx, ExternalAuthenticationMethod)
      .save(
        new ExternalAuthenticationMethod({
          externalIdentifier: config.externalIdentifier,
          strategy: config.strategy,
        })
      );

    user.authenticationMethods = [
      ...(user.authenticationMethods || []),
      authMethod,
    ];
    const savedUser = await this.connection.getRepository(ctx, User).save(user);

    let customer: Customer;
    let newCustomer: boolean = false;
    const existingCustomer = await this.customerService.findOneByUserId(
      ctx,
      savedUser.id
    );
    if (existingCustomer) {
      customer = existingCustomer;
    } else {
      customer = new Customer({
        emailAddress: config.emailAddress,
        phoneNumber: config.phoneNumber,
        firstName: config.firstName,
        lastName: config.lastName,
        user: savedUser,
      });
      newCustomer = true;
    }
    await this.channelService.assignToCurrentChannel(customer, ctx);
    await this.connection.getRepository(ctx, Customer).save(customer);

    if (newCustomer) {
      this.eventBus.publish(new CustomerEvent(ctx, customer, 'created'));
    }

    await this.historyService.createHistoryEntryForCustomer({
      customerId: customer.id,
      ctx,
      type: HistoryEntryType.CUSTOMER_REGISTERED,
      data: {
        strategy: config.strategy,
      },
    });

    if (config.verified) {
      await this.historyService.createHistoryEntryForCustomer({
        customerId: customer.id,
        ctx,
        type: HistoryEntryType.CUSTOMER_VERIFIED,
        data: {
          strategy: config.strategy,
        },
      });
    }

    return savedUser;
  }

  async findUser(
    ctx: RequestContext,
    strategy: string,
    externalIdentifier: string
  ): Promise<User | undefined> {
    const usersWithMatchingIdentifier = await this.connection
      .getRepository(ctx, User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.authenticationMethods", "authMethod")
      .andWhere("authMethod.externalIdentifier = :externalIdentifier", {
        externalIdentifier,
      })
      .andWhere("user.deletedAt IS NULL")
      .getMany();

    const matchingUser = usersWithMatchingIdentifier.find((user) =>
      user.authenticationMethods.find(
        (m) =>
          m instanceof ExternalAuthenticationMethod && m.strategy === strategy
      )
    );

    return matchingUser;
  }

  private async findExistingCustomerUserByPhoneNuber(
    ctx: RequestContext,
    phoneNumber: string
  ) {
    const customer = await this.connection
      .getRepository(ctx, Customer)
      .createQueryBuilder("customer")
      .leftJoinAndSelect("customer.user", "user")
      .leftJoin("customer.channels", "channel")
      .leftJoinAndSelect("user.authenticationMethods", "authMethod")
      .andWhere("customer.phoneNumber = :phoneNumber", { phoneNumber })
      .andWhere("user.deletedAt IS NULL")
      .getOne();

    return customer?.user;
  }
}
