/* eslint-disable */
export type Maybe<T> = T;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string | number;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AddFulfillmentToOrderResult = Fulfillment | EmptyOrderLineSelectionError | ItemsAlreadyFulfilledError | InsufficientStockOnHandError | InvalidFulfillmentHandlerError | FulfillmentStateTransitionError | CreateFulfillmentError;

export type AddItemInput = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type AddManualPaymentToOrderResult = Order | ManualPaymentStateError;

export type AddNoteToCustomerInput = {
  id: Scalars['ID'];
  note: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type AddNoteToOrderInput = {
  id: Scalars['ID'];
  note: Scalars['String'];
  isPublic: Scalars['Boolean'];
};

export type Address = Node & {
  __typename?: 'Address';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  country: Country;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type AdjustOrderLineInput = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type Adjustment = {
  __typename?: 'Adjustment';
  adjustmentSource: Scalars['String'];
  type: AdjustmentType;
  description: Scalars['String'];
  amount: Scalars['Int'];
};

export enum AdjustmentType {
  PROMOTION = 'PROMOTION',
  DISTRIBUTED_ORDER_PROMOTION = 'DISTRIBUTED_ORDER_PROMOTION'
}

export enum AdminRewardActivityType {
  SIGNUP = 'SIGNUP',
  PURCHASE = 'PURCHASE',
  SPIN = 'SPIN'
}

export enum AdminRewardRedumptionType {
  REFUND = 'REFUND',
  CANCEL = 'CANCEL',
  REDEEM = 'REDEEM'
}

export type Administrator = Node & {
  __typename?: 'Administrator';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  emailAddress: Scalars['String'];
  user: User;
  customFields?: Maybe<Scalars['JSON']>;
};

export type AdministratorFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
};

export type AdministratorList = PaginatedList & {
  __typename?: 'AdministratorList';
  items: Array<Administrator>;
  totalItems: Scalars['Int'];
};

export type AdministratorListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<AdministratorSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<AdministratorFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type AdministratorPaymentInput = {
  paymentMethod?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
};

export type AdministratorRefundInput = {
  paymentId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
};

export type AdministratorSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
};

export type Allocation = Node & StockMovement & {
  __typename?: 'Allocation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderLine: OrderLine;
};

/** Returned if an attempting to refund an OrderItem which has already been refunded */
export type AlreadyRefundedError = ErrorResult & {
  __typename?: 'AlreadyRefundedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  refundId: Scalars['ID'];
};

export type Asset = Node & {
  __typename?: 'Asset';
  tags: Array<Tag>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  type: AssetType;
  fileSize: Scalars['Int'];
  mimeType: Scalars['String'];
  width: Scalars['Int'];
  height: Scalars['Int'];
  source: Scalars['String'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type AssetFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  type?: Maybe<StringOperators>;
  fileSize?: Maybe<NumberOperators>;
  mimeType?: Maybe<StringOperators>;
  width?: Maybe<NumberOperators>;
  height?: Maybe<NumberOperators>;
  source?: Maybe<StringOperators>;
  preview?: Maybe<StringOperators>;
};

export type AssetList = PaginatedList & {
  __typename?: 'AssetList';
  items: Array<Asset>;
  totalItems: Scalars['Int'];
};

export type AssetListOptions = {
  tags?: Maybe<Array<Scalars['String']>>;
  tagsOperator?: Maybe<LogicalOperator>;
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<AssetSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<AssetFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type AssetSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  fileSize?: Maybe<SortOrder>;
  mimeType?: Maybe<SortOrder>;
  width?: Maybe<SortOrder>;
  height?: Maybe<SortOrder>;
  source?: Maybe<SortOrder>;
  preview?: Maybe<SortOrder>;
};

export enum AssetType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  BINARY = 'BINARY'
}

export type AssignAssetsToChannelInput = {
  assetIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type AssignProductVariantsToChannelInput = {
  productVariantIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
  priceFactor?: Maybe<Scalars['Float']>;
};

export type AssignProductsToChannelInput = {
  productIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
  priceFactor?: Maybe<Scalars['Float']>;
};

export type AssignPromotionsToChannelInput = {
  promotionIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type AuthenticationInput = {
  native?: Maybe<NativeAuthInput>;
};

export type AuthenticationMethod = Node & {
  __typename?: 'AuthenticationMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  strategy: Scalars['String'];
};

export type AuthenticationResult = CurrentUser | InvalidCredentialsError;

export type BooleanCustomFieldConfig = CustomField & {
  __typename?: 'BooleanCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

/** Operators for filtering on a Boolean field */
export type BooleanOperators = {
  eq?: Maybe<Scalars['Boolean']>;
};

/** Returned if an attempting to cancel lines from an Order which is still active */
export type CancelActiveOrderError = ErrorResult & {
  __typename?: 'CancelActiveOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  orderState: Scalars['String'];
};

export type CancelOrderInput = {
  /** The id of the order to be cancelled */
  orderId: Scalars['ID'];
  /** Optionally specify which OrderLines to cancel. If not provided, all OrderLines will be cancelled */
  lines?: Maybe<Array<OrderLineInput>>;
  reason?: Maybe<Scalars['String']>;
};

export type CancelOrderResult = Order | EmptyOrderLineSelectionError | QuantityTooGreatError | MultipleOrderError | CancelActiveOrderError | OrderStateTransitionError;

export type Cancellation = Node & StockMovement & {
  __typename?: 'Cancellation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderLine: OrderLine;
};

export type Channel = Node & {
  __typename?: 'Channel';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  token: Scalars['String'];
  defaultTaxZone?: Maybe<Zone>;
  defaultShippingZone?: Maybe<Zone>;
  defaultLanguageCode: LanguageCode;
  currencyCode: CurrencyCode;
  pricesIncludeTax: Scalars['Boolean'];
  customFields?: Maybe<ChannelCustomFields>;
};

export type ChannelCustomFields = {
  __typename?: 'ChannelCustomFields';
  address?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  bannerImage?: Maybe<Asset>;
  icon?: Maybe<Asset>;
  featuredMall?: Maybe<ShoppingMall>;
};

/**
 * Returned when the default LanguageCode of a Channel is no longer found in the `availableLanguages`
 * of the GlobalSettings
 */
export type ChannelDefaultLanguageError = ErrorResult & {
  __typename?: 'ChannelDefaultLanguageError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  language: Scalars['String'];
  channelCode: Scalars['String'];
};

export type Collection = Node & {
  __typename?: 'Collection';
  isPrivate: Scalars['Boolean'];
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode?: Maybe<LanguageCode>;
  name: Scalars['String'];
  slug: Scalars['String'];
  breadcrumbs: Array<CollectionBreadcrumb>;
  position: Scalars['Int'];
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  parent?: Maybe<Collection>;
  children?: Maybe<Array<Collection>>;
  filters: Array<ConfigurableOperation>;
  translations: Array<CollectionTranslation>;
  productVariants: ProductVariantList;
  customFields?: Maybe<Scalars['JSON']>;
};


export type CollectionproductVariantsArgs = {
  options?: Maybe<ProductVariantListOptions>;
};

export type CollectionBreadcrumb = {
  __typename?: 'CollectionBreadcrumb';
  id: Scalars['ID'];
  name: Scalars['String'];
  slug: Scalars['String'];
};

export type CollectionFilterParameter = {
  isPrivate?: Maybe<BooleanOperators>;
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  slug?: Maybe<StringOperators>;
  position?: Maybe<NumberOperators>;
  description?: Maybe<StringOperators>;
};

export type CollectionList = PaginatedList & {
  __typename?: 'CollectionList';
  items: Array<Collection>;
  totalItems: Scalars['Int'];
};

export type CollectionListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<CollectionSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<CollectionFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

/**
 * Which Collections are present in the products returned
 * by the search, and in what quantity.
 */
export type CollectionResult = {
  __typename?: 'CollectionResult';
  collection: Collection;
  count: Scalars['Int'];
};

export type CollectionSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  position?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type CollectionTranslation = {
  __typename?: 'CollectionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
};

export type ConfigArg = {
  __typename?: 'ConfigArg';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type ConfigArgDefinition = {
  __typename?: 'ConfigArgDefinition';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  required: Scalars['Boolean'];
  defaultValue?: Maybe<Scalars['JSON']>;
  label?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type ConfigArgInput = {
  name: Scalars['String'];
  /** A JSON stringified representation of the actual value */
  value: Scalars['String'];
};

export type ConfigurableOperation = {
  __typename?: 'ConfigurableOperation';
  code: Scalars['String'];
  args: Array<ConfigArg>;
};

export type ConfigurableOperationDefinition = {
  __typename?: 'ConfigurableOperationDefinition';
  code: Scalars['String'];
  args: Array<ConfigArgDefinition>;
  description: Scalars['String'];
};

export type ConfigurableOperationInput = {
  code: Scalars['String'];
  arguments: Array<ConfigArgInput>;
};

export type Coordinate = {
  __typename?: 'Coordinate';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type CoordinateInput = {
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type Country = Node & {
  __typename?: 'Country';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  translations: Array<CountryTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CountryFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type CountryList = PaginatedList & {
  __typename?: 'CountryList';
  items: Array<Country>;
  totalItems: Scalars['Int'];
};

export type CountryListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<CountrySortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<CountryFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type CountrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type CountryTranslation = {
  __typename?: 'CountryTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type CountryTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateAddressInput = {
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateAdministratorInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  emailAddress: Scalars['String'];
  password: Scalars['String'];
  roleIds: Array<Scalars['ID']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateAssetInput = {
  file: Scalars['Upload'];
  tags?: Maybe<Array<Scalars['String']>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateAssetResult = Asset | MimeTypeError;

export type CreateChannelCustomFieldsInput = {
  address?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  bannerImageId?: Maybe<Scalars['ID']>;
  iconId?: Maybe<Scalars['ID']>;
  featuredMallId?: Maybe<Scalars['ID']>;
};

export type CreateChannelInput = {
  code: Scalars['String'];
  token: Scalars['String'];
  defaultLanguageCode: LanguageCode;
  pricesIncludeTax: Scalars['Boolean'];
  currencyCode: CurrencyCode;
  defaultTaxZoneId: Scalars['ID'];
  defaultShippingZoneId: Scalars['ID'];
  customFields?: Maybe<CreateChannelCustomFieldsInput>;
};

export type CreateChannelResult = Channel | LanguageNotAvailableError;

export type CreateCollectionInput = {
  isPrivate?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  parentId?: Maybe<Scalars['ID']>;
  filters: Array<ConfigurableOperationInput>;
  translations: Array<CreateCollectionTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCollectionTranslationInput = {
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCountryInput = {
  code: Scalars['String'];
  translations: Array<CountryTranslationInput>;
  enabled: Scalars['Boolean'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCustomerCustomFieldsInput = {
  expo_token?: Maybe<Scalars['String']>;
};

export type CreateCustomerGroupInput = {
  name: Scalars['String'];
  customerIds?: Maybe<Array<Scalars['ID']>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateCustomerInput = {
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  customFields?: Maybe<CreateCustomerCustomFieldsInput>;
};

export type CreateCustomerResult = Customer | EmailAddressConflictError;

export type CreateFacetInput = {
  code: Scalars['String'];
  isPrivate: Scalars['Boolean'];
  translations: Array<FacetTranslationInput>;
  values?: Maybe<Array<CreateFacetValueWithFacetInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetValueInput = {
  facetId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<FacetValueTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateFacetValueWithFacetInput = {
  code: Scalars['String'];
  translations: Array<FacetValueTranslationInput>;
};

/** Returned if an error is thrown in a FulfillmentHandler's createFulfillment method */
export type CreateFulfillmentError = ErrorResult & {
  __typename?: 'CreateFulfillmentError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  fulfillmentHandlerError: Scalars['String'];
};

export type CreateGroupOptionInput = {
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
};

export type CreatePaymentMethodInput = {
  name: Scalars['String'];
  code: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  enabled: Scalars['Boolean'];
  checker?: Maybe<ConfigurableOperationInput>;
  handler: ConfigurableOperationInput;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductCustomFieldsInput = {
  vendor?: Maybe<Scalars['String']>;
  country_of_origin?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
};

export type CreateProductInput = {
  featuredAssetId?: Maybe<Scalars['ID']>;
  enabled?: Maybe<Scalars['Boolean']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  translations: Array<ProductTranslationInput>;
  customFields?: Maybe<CreateProductCustomFieldsInput>;
};

export type CreateProductOptionGroupInput = {
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
  options: Array<CreateGroupOptionInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductOptionInput = {
  productOptionGroupId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<ProductOptionGroupTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateProductVariantCustomFieldsInput = {
  originalPriceWithTax?: Maybe<Scalars['Int']>;
  costPrice?: Maybe<Scalars['Int']>;
  dimension_length?: Maybe<Scalars['Float']>;
  dimension_length_unit?: Maybe<Scalars['String']>;
  dimension_breadth?: Maybe<Scalars['Float']>;
  dimension_breadth_unit?: Maybe<Scalars['String']>;
  dimension_height?: Maybe<Scalars['Float']>;
  dimension_height_unit?: Maybe<Scalars['String']>;
  dimension_weight?: Maybe<Scalars['Float']>;
  dimension_weight_unit?: Maybe<Scalars['String']>;
};

export type CreateProductVariantInput = {
  productId: Scalars['ID'];
  translations: Array<ProductVariantTranslationInput>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  sku: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  taxCategoryId?: Maybe<Scalars['ID']>;
  optionIds?: Maybe<Array<Scalars['ID']>>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  stockOnHand?: Maybe<Scalars['Int']>;
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
  trackInventory?: Maybe<GlobalFlag>;
  customFields?: Maybe<CreateProductVariantCustomFieldsInput>;
};

export type CreateProductVariantOptionInput = {
  optionGroupId: Scalars['ID'];
  code: Scalars['String'];
  translations: Array<ProductOptionTranslationInput>;
};

export type CreatePromotionCustomFieldsInput = {
  isDefault?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type CreatePromotionInput = {
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  conditions: Array<ConfigurableOperationInput>;
  actions: Array<ConfigurableOperationInput>;
  customFields?: Maybe<CreatePromotionCustomFieldsInput>;
};

export type CreatePromotionResult = Promotion | MissingConditionsError;

export type CreateRoleInput = {
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
};

export type CreateShippingMethodInput = {
  code: Scalars['String'];
  fulfillmentHandler: Scalars['String'];
  checker: ConfigurableOperationInput;
  calculator: ConfigurableOperationInput;
  translations: Array<ShippingMethodTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateSupplierAddressInput = {
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode: Scalars['String'];
  phoneNumber: Scalars['String'];
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
};

export type CreateSupplierBankAccountInput = {
  accountHolderName: Scalars['String'];
  ifscCode: Scalars['String'];
  accountNumber: Scalars['String'];
  accountType: SupplierBankAccoutType;
};

export type CreateSupplierInput = {
  storeName: Scalars['String'];
  contactPersonFullName: Scalars['String'];
  phoneNumber: Scalars['String'];
  emailAddress: Scalars['String'];
  password: Scalars['String'];
  gstNumber: Scalars['String'];
  panNumber: Scalars['String'];
  documentsPath: Scalars['String'];
  addresses: Array<CreateSupplierAddressInput>;
  bankAccounts: Array<CreateSupplierBankAccountInput>;
};

export type CreateSupplierResult = Supplier | LanguageNotAvailableError;

export type CreateTagInput = {
  value: Scalars['String'];
};

export type CreateTaxCategoryInput = {
  name: Scalars['String'];
  isDefault?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateTaxRateInput = {
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  value: Scalars['Float'];
  categoryId: Scalars['ID'];
  zoneId: Scalars['ID'];
  customerGroupId?: Maybe<Scalars['ID']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type CreateZoneInput = {
  name: Scalars['String'];
  memberIds?: Maybe<Array<Scalars['ID']>>;
  customFields?: Maybe<Scalars['JSON']>;
};

/**
 * @description
 * ISO 4217 currency code
 *
 * @docsCategory common
 */
export enum CurrencyCode {
  /** United Arab Emirates dirham */
  AED = 'AED',
  /** Afghan afghani */
  AFN = 'AFN',
  /** Albanian lek */
  ALL = 'ALL',
  /** Armenian dram */
  AMD = 'AMD',
  /** Netherlands Antillean guilder */
  ANG = 'ANG',
  /** Angolan kwanza */
  AOA = 'AOA',
  /** Argentine peso */
  ARS = 'ARS',
  /** Australian dollar */
  AUD = 'AUD',
  /** Aruban florin */
  AWG = 'AWG',
  /** Azerbaijani manat */
  AZN = 'AZN',
  /** Bosnia and Herzegovina convertible mark */
  BAM = 'BAM',
  /** Barbados dollar */
  BBD = 'BBD',
  /** Bangladeshi taka */
  BDT = 'BDT',
  /** Bulgarian lev */
  BGN = 'BGN',
  /** Bahraini dinar */
  BHD = 'BHD',
  /** Burundian franc */
  BIF = 'BIF',
  /** Bermudian dollar */
  BMD = 'BMD',
  /** Brunei dollar */
  BND = 'BND',
  /** Boliviano */
  BOB = 'BOB',
  /** Brazilian real */
  BRL = 'BRL',
  /** Bahamian dollar */
  BSD = 'BSD',
  /** Bhutanese ngultrum */
  BTN = 'BTN',
  /** Botswana pula */
  BWP = 'BWP',
  /** Belarusian ruble */
  BYN = 'BYN',
  /** Belize dollar */
  BZD = 'BZD',
  /** Canadian dollar */
  CAD = 'CAD',
  /** Congolese franc */
  CDF = 'CDF',
  /** Swiss franc */
  CHF = 'CHF',
  /** Chilean peso */
  CLP = 'CLP',
  /** Renminbi (Chinese) yuan */
  CNY = 'CNY',
  /** Colombian peso */
  COP = 'COP',
  /** Costa Rican colon */
  CRC = 'CRC',
  /** Cuban convertible peso */
  CUC = 'CUC',
  /** Cuban peso */
  CUP = 'CUP',
  /** Cape Verde escudo */
  CVE = 'CVE',
  /** Czech koruna */
  CZK = 'CZK',
  /** Djiboutian franc */
  DJF = 'DJF',
  /** Danish krone */
  DKK = 'DKK',
  /** Dominican peso */
  DOP = 'DOP',
  /** Algerian dinar */
  DZD = 'DZD',
  /** Egyptian pound */
  EGP = 'EGP',
  /** Eritrean nakfa */
  ERN = 'ERN',
  /** Ethiopian birr */
  ETB = 'ETB',
  /** Euro */
  EUR = 'EUR',
  /** Fiji dollar */
  FJD = 'FJD',
  /** Falkland Islands pound */
  FKP = 'FKP',
  /** Pound sterling */
  GBP = 'GBP',
  /** Georgian lari */
  GEL = 'GEL',
  /** Ghanaian cedi */
  GHS = 'GHS',
  /** Gibraltar pound */
  GIP = 'GIP',
  /** Gambian dalasi */
  GMD = 'GMD',
  /** Guinean franc */
  GNF = 'GNF',
  /** Guatemalan quetzal */
  GTQ = 'GTQ',
  /** Guyanese dollar */
  GYD = 'GYD',
  /** Hong Kong dollar */
  HKD = 'HKD',
  /** Honduran lempira */
  HNL = 'HNL',
  /** Croatian kuna */
  HRK = 'HRK',
  /** Haitian gourde */
  HTG = 'HTG',
  /** Hungarian forint */
  HUF = 'HUF',
  /** Indonesian rupiah */
  IDR = 'IDR',
  /** Israeli new shekel */
  ILS = 'ILS',
  /** Indian rupee */
  INR = 'INR',
  /** Iraqi dinar */
  IQD = 'IQD',
  /** Iranian rial */
  IRR = 'IRR',
  /** Icelandic króna */
  ISK = 'ISK',
  /** Jamaican dollar */
  JMD = 'JMD',
  /** Jordanian dinar */
  JOD = 'JOD',
  /** Japanese yen */
  JPY = 'JPY',
  /** Kenyan shilling */
  KES = 'KES',
  /** Kyrgyzstani som */
  KGS = 'KGS',
  /** Cambodian riel */
  KHR = 'KHR',
  /** Comoro franc */
  KMF = 'KMF',
  /** North Korean won */
  KPW = 'KPW',
  /** South Korean won */
  KRW = 'KRW',
  /** Kuwaiti dinar */
  KWD = 'KWD',
  /** Cayman Islands dollar */
  KYD = 'KYD',
  /** Kazakhstani tenge */
  KZT = 'KZT',
  /** Lao kip */
  LAK = 'LAK',
  /** Lebanese pound */
  LBP = 'LBP',
  /** Sri Lankan rupee */
  LKR = 'LKR',
  /** Liberian dollar */
  LRD = 'LRD',
  /** Lesotho loti */
  LSL = 'LSL',
  /** Libyan dinar */
  LYD = 'LYD',
  /** Moroccan dirham */
  MAD = 'MAD',
  /** Moldovan leu */
  MDL = 'MDL',
  /** Malagasy ariary */
  MGA = 'MGA',
  /** Macedonian denar */
  MKD = 'MKD',
  /** Myanmar kyat */
  MMK = 'MMK',
  /** Mongolian tögrög */
  MNT = 'MNT',
  /** Macanese pataca */
  MOP = 'MOP',
  /** Mauritanian ouguiya */
  MRU = 'MRU',
  /** Mauritian rupee */
  MUR = 'MUR',
  /** Maldivian rufiyaa */
  MVR = 'MVR',
  /** Malawian kwacha */
  MWK = 'MWK',
  /** Mexican peso */
  MXN = 'MXN',
  /** Malaysian ringgit */
  MYR = 'MYR',
  /** Mozambican metical */
  MZN = 'MZN',
  /** Namibian dollar */
  NAD = 'NAD',
  /** Nigerian naira */
  NGN = 'NGN',
  /** Nicaraguan córdoba */
  NIO = 'NIO',
  /** Norwegian krone */
  NOK = 'NOK',
  /** Nepalese rupee */
  NPR = 'NPR',
  /** New Zealand dollar */
  NZD = 'NZD',
  /** Omani rial */
  OMR = 'OMR',
  /** Panamanian balboa */
  PAB = 'PAB',
  /** Peruvian sol */
  PEN = 'PEN',
  /** Papua New Guinean kina */
  PGK = 'PGK',
  /** Philippine peso */
  PHP = 'PHP',
  /** Pakistani rupee */
  PKR = 'PKR',
  /** Polish złoty */
  PLN = 'PLN',
  /** Paraguayan guaraní */
  PYG = 'PYG',
  /** Qatari riyal */
  QAR = 'QAR',
  /** Romanian leu */
  RON = 'RON',
  /** Serbian dinar */
  RSD = 'RSD',
  /** Russian ruble */
  RUB = 'RUB',
  /** Rwandan franc */
  RWF = 'RWF',
  /** Saudi riyal */
  SAR = 'SAR',
  /** Solomon Islands dollar */
  SBD = 'SBD',
  /** Seychelles rupee */
  SCR = 'SCR',
  /** Sudanese pound */
  SDG = 'SDG',
  /** Swedish krona/kronor */
  SEK = 'SEK',
  /** Singapore dollar */
  SGD = 'SGD',
  /** Saint Helena pound */
  SHP = 'SHP',
  /** Sierra Leonean leone */
  SLL = 'SLL',
  /** Somali shilling */
  SOS = 'SOS',
  /** Surinamese dollar */
  SRD = 'SRD',
  /** South Sudanese pound */
  SSP = 'SSP',
  /** São Tomé and Príncipe dobra */
  STN = 'STN',
  /** Salvadoran colón */
  SVC = 'SVC',
  /** Syrian pound */
  SYP = 'SYP',
  /** Swazi lilangeni */
  SZL = 'SZL',
  /** Thai baht */
  THB = 'THB',
  /** Tajikistani somoni */
  TJS = 'TJS',
  /** Turkmenistan manat */
  TMT = 'TMT',
  /** Tunisian dinar */
  TND = 'TND',
  /** Tongan paʻanga */
  TOP = 'TOP',
  /** Turkish lira */
  TRY = 'TRY',
  /** Trinidad and Tobago dollar */
  TTD = 'TTD',
  /** New Taiwan dollar */
  TWD = 'TWD',
  /** Tanzanian shilling */
  TZS = 'TZS',
  /** Ukrainian hryvnia */
  UAH = 'UAH',
  /** Ugandan shilling */
  UGX = 'UGX',
  /** United States dollar */
  USD = 'USD',
  /** Uruguayan peso */
  UYU = 'UYU',
  /** Uzbekistan som */
  UZS = 'UZS',
  /** Venezuelan bolívar soberano */
  VES = 'VES',
  /** Vietnamese đồng */
  VND = 'VND',
  /** Vanuatu vatu */
  VUV = 'VUV',
  /** Samoan tala */
  WST = 'WST',
  /** CFA franc BEAC */
  XAF = 'XAF',
  /** East Caribbean dollar */
  XCD = 'XCD',
  /** CFA franc BCEAO */
  XOF = 'XOF',
  /** CFP franc (franc Pacifique) */
  XPF = 'XPF',
  /** Yemeni rial */
  YER = 'YER',
  /** South African rand */
  ZAR = 'ZAR',
  /** Zambian kwacha */
  ZMW = 'ZMW',
  /** Zimbabwean dollar */
  ZWL = 'ZWL'
}

export type CurrentUser = {
  __typename?: 'CurrentUser';
  id: Scalars['ID'];
  identifier: Scalars['String'];
  channels: Array<CurrentUserChannel>;
};

export type CurrentUserChannel = {
  __typename?: 'CurrentUserChannel';
  id: Scalars['ID'];
  token: Scalars['String'];
  code: Scalars['String'];
  permissions: Array<Permission>;
};

export type CustomField = {
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type CustomFieldConfig = StringCustomFieldConfig | LocaleStringCustomFieldConfig | IntCustomFieldConfig | FloatCustomFieldConfig | BooleanCustomFieldConfig | DateTimeCustomFieldConfig | RelationCustomFieldConfig | TextCustomFieldConfig;

export type CustomFields = {
  __typename?: 'CustomFields';
  Address: Array<CustomFieldConfig>;
  Administrator: Array<CustomFieldConfig>;
  Asset: Array<CustomFieldConfig>;
  Channel: Array<CustomFieldConfig>;
  Collection: Array<CustomFieldConfig>;
  Country: Array<CustomFieldConfig>;
  Customer: Array<CustomFieldConfig>;
  CustomerGroup: Array<CustomFieldConfig>;
  Facet: Array<CustomFieldConfig>;
  FacetValue: Array<CustomFieldConfig>;
  Fulfillment: Array<CustomFieldConfig>;
  GlobalSettings: Array<CustomFieldConfig>;
  Order: Array<CustomFieldConfig>;
  OrderLine: Array<CustomFieldConfig>;
  PaymentMethod: Array<CustomFieldConfig>;
  Product: Array<CustomFieldConfig>;
  ProductOption: Array<CustomFieldConfig>;
  ProductOptionGroup: Array<CustomFieldConfig>;
  ProductVariant: Array<CustomFieldConfig>;
  Promotion: Array<CustomFieldConfig>;
  ShippingMethod: Array<CustomFieldConfig>;
  TaxCategory: Array<CustomFieldConfig>;
  TaxRate: Array<CustomFieldConfig>;
  User: Array<CustomFieldConfig>;
  Zone: Array<CustomFieldConfig>;
};

export type Customer = Node & {
  __typename?: 'Customer';
  groups: Array<CustomerGroup>;
  history: HistoryEntryList;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  title?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress: Scalars['String'];
  addresses?: Maybe<Array<Address>>;
  orders: OrderList;
  user?: Maybe<User>;
  rewardsBalance: Scalars['Int'];
  rewardsTier: Scalars['String'];
  avialableSpins: Scalars['Int'];
  nextRewardsTier: NextTier;
  defaultPromotions: Array<Promotion>;
  activeMall?: Maybe<MallEntry>;
  customFields?: Maybe<CustomerCustomFields>;
};


export type CustomerhistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>;
};


export type CustomerordersArgs = {
  options?: Maybe<OrderListOptions>;
};

export type CustomerCustomFields = {
  __typename?: 'CustomerCustomFields';
  expo_token?: Maybe<Scalars['String']>;
};

export type CustomerFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  title?: Maybe<StringOperators>;
  firstName?: Maybe<StringOperators>;
  lastName?: Maybe<StringOperators>;
  phoneNumber?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
  rewardsBalance?: Maybe<NumberOperators>;
  rewardsTier?: Maybe<StringOperators>;
  avialableSpins?: Maybe<NumberOperators>;
  expo_token?: Maybe<StringOperators>;
};

export type CustomerGroup = Node & {
  __typename?: 'CustomerGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  customers: CustomerList;
  customFields?: Maybe<Scalars['JSON']>;
};


export type CustomerGroupcustomersArgs = {
  options?: Maybe<CustomerListOptions>;
};

export type CustomerGroupFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
};

export type CustomerGroupList = PaginatedList & {
  __typename?: 'CustomerGroupList';
  items: Array<CustomerGroup>;
  totalItems: Scalars['Int'];
};

export type CustomerGroupListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<CustomerGroupSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<CustomerGroupFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type CustomerGroupSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
};

export type CustomerList = PaginatedList & {
  __typename?: 'CustomerList';
  items: Array<Customer>;
  totalItems: Scalars['Int'];
};

export type CustomerListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<CustomerSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<CustomerFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type CustomerSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  title?: Maybe<SortOrder>;
  firstName?: Maybe<SortOrder>;
  lastName?: Maybe<SortOrder>;
  phoneNumber?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
  rewardsBalance?: Maybe<SortOrder>;
  rewardsTier?: Maybe<SortOrder>;
  avialableSpins?: Maybe<SortOrder>;
  expo_token?: Maybe<SortOrder>;
};

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  eq?: Maybe<Scalars['DateTime']>;
  before?: Maybe<Scalars['DateTime']>;
  after?: Maybe<Scalars['DateTime']>;
  between?: Maybe<DateRange>;
};

export type DateRange = {
  start: Scalars['DateTime'];
  end: Scalars['DateTime'];
};


/**
 * Expects the same validation formats as the `<input type="datetime-local">` HTML element.
 * See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#Additional_attributes
 */
export type DateTimeCustomFieldConfig = CustomField & {
  __typename?: 'DateTimeCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['String']>;
  max?: Maybe<Scalars['String']>;
  step?: Maybe<Scalars['Int']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type DeleteAssetInput = {
  assetId: Scalars['ID'];
  force?: Maybe<Scalars['Boolean']>;
  deleteFromAllChannels?: Maybe<Scalars['Boolean']>;
};

export type DeleteAssetsInput = {
  assetIds: Array<Scalars['ID']>;
  force?: Maybe<Scalars['Boolean']>;
  deleteFromAllChannels?: Maybe<Scalars['Boolean']>;
};

export type DeletionResponse = {
  __typename?: 'DeletionResponse';
  result: DeletionResult;
  message?: Maybe<Scalars['String']>;
};

export enum DeletionResult {
  /** The entity was successfully deleted */
  DELETED = 'DELETED',
  /** Deletion did not take place, reason given in message */
  NOT_DELETED = 'NOT_DELETED'
}

export type Discount = {
  __typename?: 'Discount';
  adjustmentSource: Scalars['String'];
  type: AdjustmentType;
  description: Scalars['String'];
  amount: Scalars['Int'];
  amountWithTax: Scalars['Int'];
  rewards?: Maybe<Scalars['Int']>;
};

/** Retured when attemting to create a Customer with an email address already registered to an existing User. */
export type EmailAddressConflictError = ErrorResult & {
  __typename?: 'EmailAddressConflictError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if no OrderLines have been specified for the operation */
export type EmptyOrderLineSelectionError = ErrorResult & {
  __typename?: 'EmptyOrderLineSelectionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export enum ErrorCode {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  MIME_TYPE_ERROR = 'MIME_TYPE_ERROR',
  LANGUAGE_NOT_AVAILABLE_ERROR = 'LANGUAGE_NOT_AVAILABLE_ERROR',
  CHANNEL_DEFAULT_LANGUAGE_ERROR = 'CHANNEL_DEFAULT_LANGUAGE_ERROR',
  SETTLE_PAYMENT_ERROR = 'SETTLE_PAYMENT_ERROR',
  EMPTY_ORDER_LINE_SELECTION_ERROR = 'EMPTY_ORDER_LINE_SELECTION_ERROR',
  ITEMS_ALREADY_FULFILLED_ERROR = 'ITEMS_ALREADY_FULFILLED_ERROR',
  INVALID_FULFILLMENT_HANDLER_ERROR = 'INVALID_FULFILLMENT_HANDLER_ERROR',
  CREATE_FULFILLMENT_ERROR = 'CREATE_FULFILLMENT_ERROR',
  INSUFFICIENT_STOCK_ON_HAND_ERROR = 'INSUFFICIENT_STOCK_ON_HAND_ERROR',
  MULTIPLE_ORDER_ERROR = 'MULTIPLE_ORDER_ERROR',
  CANCEL_ACTIVE_ORDER_ERROR = 'CANCEL_ACTIVE_ORDER_ERROR',
  PAYMENT_ORDER_MISMATCH_ERROR = 'PAYMENT_ORDER_MISMATCH_ERROR',
  REFUND_ORDER_STATE_ERROR = 'REFUND_ORDER_STATE_ERROR',
  NOTHING_TO_REFUND_ERROR = 'NOTHING_TO_REFUND_ERROR',
  ALREADY_REFUNDED_ERROR = 'ALREADY_REFUNDED_ERROR',
  QUANTITY_TOO_GREAT_ERROR = 'QUANTITY_TOO_GREAT_ERROR',
  REFUND_STATE_TRANSITION_ERROR = 'REFUND_STATE_TRANSITION_ERROR',
  PAYMENT_STATE_TRANSITION_ERROR = 'PAYMENT_STATE_TRANSITION_ERROR',
  FULFILLMENT_STATE_TRANSITION_ERROR = 'FULFILLMENT_STATE_TRANSITION_ERROR',
  ORDER_MODIFICATION_STATE_ERROR = 'ORDER_MODIFICATION_STATE_ERROR',
  NO_CHANGES_SPECIFIED_ERROR = 'NO_CHANGES_SPECIFIED_ERROR',
  PAYMENT_METHOD_MISSING_ERROR = 'PAYMENT_METHOD_MISSING_ERROR',
  REFUND_PAYMENT_ID_MISSING_ERROR = 'REFUND_PAYMENT_ID_MISSING_ERROR',
  MANUAL_PAYMENT_STATE_ERROR = 'MANUAL_PAYMENT_STATE_ERROR',
  PRODUCT_OPTION_IN_USE_ERROR = 'PRODUCT_OPTION_IN_USE_ERROR',
  MISSING_CONDITIONS_ERROR = 'MISSING_CONDITIONS_ERROR',
  NATIVE_AUTH_STRATEGY_ERROR = 'NATIVE_AUTH_STRATEGY_ERROR',
  INVALID_CREDENTIALS_ERROR = 'INVALID_CREDENTIALS_ERROR',
  ORDER_STATE_TRANSITION_ERROR = 'ORDER_STATE_TRANSITION_ERROR',
  EMAIL_ADDRESS_CONFLICT_ERROR = 'EMAIL_ADDRESS_CONFLICT_ERROR',
  ORDER_LIMIT_ERROR = 'ORDER_LIMIT_ERROR',
  NEGATIVE_QUANTITY_ERROR = 'NEGATIVE_QUANTITY_ERROR',
  INSUFFICIENT_STOCK_ERROR = 'INSUFFICIENT_STOCK_ERROR'
}

export type ErrorResult = {
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Facet = Node & {
  __typename?: 'Facet';
  isPrivate: Scalars['Boolean'];
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  code: Scalars['String'];
  values: Array<FacetValue>;
  translations: Array<FacetTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FacetFilterParameter = {
  isPrivate?: Maybe<BooleanOperators>;
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
};

export type FacetList = PaginatedList & {
  __typename?: 'FacetList';
  items: Array<Facet>;
  totalItems: Scalars['Int'];
};

export type FacetListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<FacetSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<FacetFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type FacetSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
};

export type FacetTranslation = {
  __typename?: 'FacetTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FacetValue = Node & {
  __typename?: 'FacetValue';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  facet: Facet;
  name: Scalars['String'];
  code: Scalars['String'];
  translations: Array<FacetValueTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

/**
 * Used to construct boolean expressions for filtering search results
 * by FacetValue ID. Examples:
 *
 * * ID=1 OR ID=2: `{ facetValueFilters: [{ or: [1,2] }] }`
 * * ID=1 AND ID=2: `{ facetValueFilters: [{ and: 1 }, { and: 2 }] }`
 * * ID=1 AND (ID=2 OR ID=3): `{ facetValueFilters: [{ and: 1 }, { or: [2,3] }] }`
 */
export type FacetValueFilterInput = {
  and?: Maybe<Scalars['ID']>;
  or?: Maybe<Array<Scalars['ID']>>;
};

/**
 * Which FacetValues are present in the products returned
 * by the search, and in what quantity.
 */
export type FacetValueResult = {
  __typename?: 'FacetValueResult';
  facetValue: FacetValue;
  count: Scalars['Int'];
};

export type FacetValueTranslation = {
  __typename?: 'FacetValueTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type FacetValueTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type FloatCustomFieldConfig = CustomField & {
  __typename?: 'FloatCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['Float']>;
  max?: Maybe<Scalars['Float']>;
  step?: Maybe<Scalars['Float']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type FulfillOrderInput = {
  lines: Array<OrderLineInput>;
  handler: ConfigurableOperationInput;
};

export type Fulfillment = Node & {
  __typename?: 'Fulfillment';
  nextStates: Array<Scalars['String']>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  orderItems: Array<OrderItem>;
  state: Scalars['String'];
  method: Scalars['String'];
  trackingCode?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

/** Returned when there is an error in transitioning the Fulfillment state */
export type FulfillmentStateTransitionError = ErrorResult & {
  __typename?: 'FulfillmentStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

export enum GlobalFlag {
  TRUE = 'TRUE',
  FALSE = 'FALSE',
  INHERIT = 'INHERIT'
}

export type GlobalSettings = {
  __typename?: 'GlobalSettings';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  availableLanguages: Array<LanguageCode>;
  trackInventory: Scalars['Boolean'];
  outOfStockThreshold: Scalars['Int'];
  serverConfig: ServerConfig;
  customFields?: Maybe<GlobalSettingsCustomFields>;
};

export type GlobalSettingsCustomFields = {
  __typename?: 'GlobalSettingsCustomFields';
  signupRewards?: Maybe<Scalars['Int']>;
  spinWheelRewards?: Maybe<Array<Scalars['Int']>>;
  numberOfSpinsLimit?: Maybe<Scalars['Int']>;
  numberOfSpinsLimitFrequency?: Maybe<Scalars['String']>;
  rewardTiers?: Maybe<Array<Scalars['String']>>;
  purchaseRewardsMutliplier?: Maybe<Scalars['Float']>;
  redeemRewardsMutliplier?: Maybe<Scalars['Float']>;
  minimumRewardsBalance?: Maybe<Scalars['Int']>;
};

export type HistoryEntry = Node & {
  __typename?: 'HistoryEntry';
  isPublic: Scalars['Boolean'];
  administrator?: Maybe<Administrator>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  type: HistoryEntryType;
  data: Scalars['JSON'];
};

export type HistoryEntryFilterParameter = {
  isPublic?: Maybe<BooleanOperators>;
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  type?: Maybe<StringOperators>;
};

export type HistoryEntryList = PaginatedList & {
  __typename?: 'HistoryEntryList';
  items: Array<HistoryEntry>;
  totalItems: Scalars['Int'];
};

export type HistoryEntryListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<HistoryEntrySortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<HistoryEntryFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type HistoryEntrySortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
};

export enum HistoryEntryType {
  CUSTOMER_REGISTERED = 'CUSTOMER_REGISTERED',
  CUSTOMER_VERIFIED = 'CUSTOMER_VERIFIED',
  CUSTOMER_DETAIL_UPDATED = 'CUSTOMER_DETAIL_UPDATED',
  CUSTOMER_ADDED_TO_GROUP = 'CUSTOMER_ADDED_TO_GROUP',
  CUSTOMER_REMOVED_FROM_GROUP = 'CUSTOMER_REMOVED_FROM_GROUP',
  CUSTOMER_ADDRESS_CREATED = 'CUSTOMER_ADDRESS_CREATED',
  CUSTOMER_ADDRESS_UPDATED = 'CUSTOMER_ADDRESS_UPDATED',
  CUSTOMER_ADDRESS_DELETED = 'CUSTOMER_ADDRESS_DELETED',
  CUSTOMER_PASSWORD_UPDATED = 'CUSTOMER_PASSWORD_UPDATED',
  CUSTOMER_PASSWORD_RESET_REQUESTED = 'CUSTOMER_PASSWORD_RESET_REQUESTED',
  CUSTOMER_PASSWORD_RESET_VERIFIED = 'CUSTOMER_PASSWORD_RESET_VERIFIED',
  CUSTOMER_EMAIL_UPDATE_REQUESTED = 'CUSTOMER_EMAIL_UPDATE_REQUESTED',
  CUSTOMER_EMAIL_UPDATE_VERIFIED = 'CUSTOMER_EMAIL_UPDATE_VERIFIED',
  CUSTOMER_NOTE = 'CUSTOMER_NOTE',
  ORDER_STATE_TRANSITION = 'ORDER_STATE_TRANSITION',
  ORDER_PAYMENT_TRANSITION = 'ORDER_PAYMENT_TRANSITION',
  ORDER_FULFILLMENT = 'ORDER_FULFILLMENT',
  ORDER_CANCELLATION = 'ORDER_CANCELLATION',
  ORDER_REFUND_TRANSITION = 'ORDER_REFUND_TRANSITION',
  ORDER_FULFILLMENT_TRANSITION = 'ORDER_FULFILLMENT_TRANSITION',
  ORDER_NOTE = 'ORDER_NOTE',
  ORDER_COUPON_APPLIED = 'ORDER_COUPON_APPLIED',
  ORDER_COUPON_REMOVED = 'ORDER_COUPON_REMOVED',
  ORDER_MODIFIED = 'ORDER_MODIFIED'
}

/** Operators for filtering on an ID field */
export type IDOperators = {
  eq?: Maybe<Scalars['String']>;
  notEq?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
};

export type ImportInfo = {
  __typename?: 'ImportInfo';
  errors?: Maybe<Array<Scalars['String']>>;
  processed: Scalars['Int'];
  imported: Scalars['Int'];
};

/** Returned when attempting to add more items to the Order than are available */
export type InsufficientStockError = ErrorResult & {
  __typename?: 'InsufficientStockError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  quantityAvailable: Scalars['Int'];
  order: Order;
};

/**
 * Returned if attempting to create a Fulfillment when there is insufficient
 * stockOnHand of a ProductVariant to satisfy the requested quantity.
 */
export type InsufficientStockOnHandError = ErrorResult & {
  __typename?: 'InsufficientStockOnHandError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  stockOnHand: Scalars['Int'];
};

export type IntCustomFieldConfig = CustomField & {
  __typename?: 'IntCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  min?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
  step?: Maybe<Scalars['Int']>;
  ui?: Maybe<Scalars['JSON']>;
};

/** Returned if the user authentication credentials are not valid */
export type InvalidCredentialsError = ErrorResult & {
  __typename?: 'InvalidCredentialsError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  authenticationError: Scalars['String'];
};

/** Returned if the specified FulfillmentHandler code is not valid */
export type InvalidFulfillmentHandlerError = ErrorResult & {
  __typename?: 'InvalidFulfillmentHandlerError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned if the specified items are already part of a Fulfillment */
export type ItemsAlreadyFulfilledError = ErrorResult & {
  __typename?: 'ItemsAlreadyFulfilledError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};


export type Job = Node & {
  __typename?: 'Job';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  startedAt?: Maybe<Scalars['DateTime']>;
  settledAt?: Maybe<Scalars['DateTime']>;
  queueName: Scalars['String'];
  state: JobState;
  progress: Scalars['Float'];
  data?: Maybe<Scalars['JSON']>;
  result?: Maybe<Scalars['JSON']>;
  error?: Maybe<Scalars['JSON']>;
  isSettled: Scalars['Boolean'];
  duration: Scalars['Int'];
  retries: Scalars['Int'];
  attempts: Scalars['Int'];
};

export type JobBufferSize = {
  __typename?: 'JobBufferSize';
  bufferId: Scalars['String'];
  size: Scalars['Int'];
};

export type JobFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  startedAt?: Maybe<DateOperators>;
  settledAt?: Maybe<DateOperators>;
  queueName?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  progress?: Maybe<NumberOperators>;
  isSettled?: Maybe<BooleanOperators>;
  duration?: Maybe<NumberOperators>;
  retries?: Maybe<NumberOperators>;
  attempts?: Maybe<NumberOperators>;
};

export type JobList = PaginatedList & {
  __typename?: 'JobList';
  items: Array<Job>;
  totalItems: Scalars['Int'];
};

export type JobListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<JobSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<JobFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type JobQueue = {
  __typename?: 'JobQueue';
  name: Scalars['String'];
  running: Scalars['Boolean'];
};

export type JobSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  startedAt?: Maybe<SortOrder>;
  settledAt?: Maybe<SortOrder>;
  queueName?: Maybe<SortOrder>;
  progress?: Maybe<SortOrder>;
  duration?: Maybe<SortOrder>;
  retries?: Maybe<SortOrder>;
  attempts?: Maybe<SortOrder>;
};

/**
 * @description
 * The state of a Job in the JobQueue
 *
 * @docsCategory common
 */
export enum JobState {
  PENDING = 'PENDING',
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  RETRYING = 'RETRYING',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

/**
 * @description
 * Languages in the form of a ISO 639-1 language code with optional
 * region or script modifier (e.g. de_AT). The selection available is based
 * on the [Unicode CLDR summary list](https://unicode-org.github.io/cldr-staging/charts/37/summary/root.html)
 * and includes the major spoken languages of the world and any widely-used variants.
 *
 * @docsCategory common
 */
export enum LanguageCode {
  /** Afrikaans */
  af = 'af',
  /** Akan */
  ak = 'ak',
  /** Albanian */
  sq = 'sq',
  /** Amharic */
  am = 'am',
  /** Arabic */
  ar = 'ar',
  /** Armenian */
  hy = 'hy',
  /** Assamese */
  as = 'as',
  /** Azerbaijani */
  az = 'az',
  /** Bambara */
  bm = 'bm',
  /** Bangla */
  bn = 'bn',
  /** Basque */
  eu = 'eu',
  /** Belarusian */
  be = 'be',
  /** Bosnian */
  bs = 'bs',
  /** Breton */
  br = 'br',
  /** Bulgarian */
  bg = 'bg',
  /** Burmese */
  my = 'my',
  /** Catalan */
  ca = 'ca',
  /** Chechen */
  ce = 'ce',
  /** Chinese */
  zh = 'zh',
  /** Simplified Chinese */
  zh_Hans = 'zh_Hans',
  /** Traditional Chinese */
  zh_Hant = 'zh_Hant',
  /** Church Slavic */
  cu = 'cu',
  /** Cornish */
  kw = 'kw',
  /** Corsican */
  co = 'co',
  /** Croatian */
  hr = 'hr',
  /** Czech */
  cs = 'cs',
  /** Danish */
  da = 'da',
  /** Dutch */
  nl = 'nl',
  /** Flemish */
  nl_BE = 'nl_BE',
  /** Dzongkha */
  dz = 'dz',
  /** English */
  en = 'en',
  /** Australian English */
  en_AU = 'en_AU',
  /** Canadian English */
  en_CA = 'en_CA',
  /** British English */
  en_GB = 'en_GB',
  /** American English */
  en_US = 'en_US',
  /** Esperanto */
  eo = 'eo',
  /** Estonian */
  et = 'et',
  /** Ewe */
  ee = 'ee',
  /** Faroese */
  fo = 'fo',
  /** Finnish */
  fi = 'fi',
  /** French */
  fr = 'fr',
  /** Canadian French */
  fr_CA = 'fr_CA',
  /** Swiss French */
  fr_CH = 'fr_CH',
  /** Fulah */
  ff = 'ff',
  /** Galician */
  gl = 'gl',
  /** Ganda */
  lg = 'lg',
  /** Georgian */
  ka = 'ka',
  /** German */
  de = 'de',
  /** Austrian German */
  de_AT = 'de_AT',
  /** Swiss High German */
  de_CH = 'de_CH',
  /** Greek */
  el = 'el',
  /** Gujarati */
  gu = 'gu',
  /** Haitian Creole */
  ht = 'ht',
  /** Hausa */
  ha = 'ha',
  /** Hebrew */
  he = 'he',
  /** Hindi */
  hi = 'hi',
  /** Hungarian */
  hu = 'hu',
  /** Icelandic */
  is = 'is',
  /** Igbo */
  ig = 'ig',
  /** Indonesian */
  id = 'id',
  /** Interlingua */
  ia = 'ia',
  /** Irish */
  ga = 'ga',
  /** Italian */
  it = 'it',
  /** Japanese */
  ja = 'ja',
  /** Javanese */
  jv = 'jv',
  /** Kalaallisut */
  kl = 'kl',
  /** Kannada */
  kn = 'kn',
  /** Kashmiri */
  ks = 'ks',
  /** Kazakh */
  kk = 'kk',
  /** Khmer */
  km = 'km',
  /** Kikuyu */
  ki = 'ki',
  /** Kinyarwanda */
  rw = 'rw',
  /** Korean */
  ko = 'ko',
  /** Kurdish */
  ku = 'ku',
  /** Kyrgyz */
  ky = 'ky',
  /** Lao */
  lo = 'lo',
  /** Latin */
  la = 'la',
  /** Latvian */
  lv = 'lv',
  /** Lingala */
  ln = 'ln',
  /** Lithuanian */
  lt = 'lt',
  /** Luba-Katanga */
  lu = 'lu',
  /** Luxembourgish */
  lb = 'lb',
  /** Macedonian */
  mk = 'mk',
  /** Malagasy */
  mg = 'mg',
  /** Malay */
  ms = 'ms',
  /** Malayalam */
  ml = 'ml',
  /** Maltese */
  mt = 'mt',
  /** Manx */
  gv = 'gv',
  /** Maori */
  mi = 'mi',
  /** Marathi */
  mr = 'mr',
  /** Mongolian */
  mn = 'mn',
  /** Nepali */
  ne = 'ne',
  /** North Ndebele */
  nd = 'nd',
  /** Northern Sami */
  se = 'se',
  /** Norwegian Bokmål */
  nb = 'nb',
  /** Norwegian Nynorsk */
  nn = 'nn',
  /** Nyanja */
  ny = 'ny',
  /** Odia */
  or = 'or',
  /** Oromo */
  om = 'om',
  /** Ossetic */
  os = 'os',
  /** Pashto */
  ps = 'ps',
  /** Persian */
  fa = 'fa',
  /** Dari */
  fa_AF = 'fa_AF',
  /** Polish */
  pl = 'pl',
  /** Portuguese */
  pt = 'pt',
  /** Brazilian Portuguese */
  pt_BR = 'pt_BR',
  /** European Portuguese */
  pt_PT = 'pt_PT',
  /** Punjabi */
  pa = 'pa',
  /** Quechua */
  qu = 'qu',
  /** Romanian */
  ro = 'ro',
  /** Moldavian */
  ro_MD = 'ro_MD',
  /** Romansh */
  rm = 'rm',
  /** Rundi */
  rn = 'rn',
  /** Russian */
  ru = 'ru',
  /** Samoan */
  sm = 'sm',
  /** Sango */
  sg = 'sg',
  /** Sanskrit */
  sa = 'sa',
  /** Scottish Gaelic */
  gd = 'gd',
  /** Serbian */
  sr = 'sr',
  /** Shona */
  sn = 'sn',
  /** Sichuan Yi */
  ii = 'ii',
  /** Sindhi */
  sd = 'sd',
  /** Sinhala */
  si = 'si',
  /** Slovak */
  sk = 'sk',
  /** Slovenian */
  sl = 'sl',
  /** Somali */
  so = 'so',
  /** Southern Sotho */
  st = 'st',
  /** Spanish */
  es = 'es',
  /** European Spanish */
  es_ES = 'es_ES',
  /** Mexican Spanish */
  es_MX = 'es_MX',
  /** Sundanese */
  su = 'su',
  /** Swahili */
  sw = 'sw',
  /** Congo Swahili */
  sw_CD = 'sw_CD',
  /** Swedish */
  sv = 'sv',
  /** Tajik */
  tg = 'tg',
  /** Tamil */
  ta = 'ta',
  /** Tatar */
  tt = 'tt',
  /** Telugu */
  te = 'te',
  /** Thai */
  th = 'th',
  /** Tibetan */
  bo = 'bo',
  /** Tigrinya */
  ti = 'ti',
  /** Tongan */
  to = 'to',
  /** Turkish */
  tr = 'tr',
  /** Turkmen */
  tk = 'tk',
  /** Ukrainian */
  uk = 'uk',
  /** Urdu */
  ur = 'ur',
  /** Uyghur */
  ug = 'ug',
  /** Uzbek */
  uz = 'uz',
  /** Vietnamese */
  vi = 'vi',
  /** Volapük */
  vo = 'vo',
  /** Welsh */
  cy = 'cy',
  /** Western Frisian */
  fy = 'fy',
  /** Wolof */
  wo = 'wo',
  /** Xhosa */
  xh = 'xh',
  /** Yiddish */
  yi = 'yi',
  /** Yoruba */
  yo = 'yo',
  /** Zulu */
  zu = 'zu'
}

/** Returned if attempting to set a Channel's defaultLanguageCode to a language which is not enabled in GlobalSettings */
export type LanguageNotAvailableError = ErrorResult & {
  __typename?: 'LanguageNotAvailableError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  languageCode: Scalars['String'];
};

export type LoadRewardsInput = {
  customerId: Scalars['ID'];
  orderId?: Maybe<Scalars['ID']>;
  activity: AdminRewardActivityType;
  note?: Maybe<Scalars['String']>;
  rewards: Scalars['Int'];
};

export type LocaleStringCustomFieldConfig = CustomField & {
  __typename?: 'LocaleStringCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  length?: Maybe<Scalars['Int']>;
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type LocalizedString = {
  __typename?: 'LocalizedString';
  languageCode: LanguageCode;
  value: Scalars['String'];
};

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR'
}

export type MallEntry = Node & {
  __typename?: 'MallEntry';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  customer: Customer;
  mall?: Maybe<ShoppingMall>;
  checkedInAt: Scalars['DateTime'];
  checkedOutAt?: Maybe<Scalars['DateTime']>;
};

export type ManualPaymentInput = {
  orderId: Scalars['ID'];
  method: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
};

/**
 * Returned when a call to addManualPaymentToOrder is made but the Order
 * is not in the required state.
 */
export type ManualPaymentStateError = ErrorResult & {
  __typename?: 'ManualPaymentStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type MimeTypeError = ErrorResult & {
  __typename?: 'MimeTypeError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  fileName: Scalars['String'];
  mimeType: Scalars['String'];
};

/** Returned if a PromotionCondition has neither a couponCode nor any conditions set */
export type MissingConditionsError = ErrorResult & {
  __typename?: 'MissingConditionsError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type ModifyOrderInput = {
  dryRun: Scalars['Boolean'];
  orderId: Scalars['ID'];
  addItems?: Maybe<Array<AddItemInput>>;
  adjustOrderLines?: Maybe<Array<AdjustOrderLineInput>>;
  surcharges?: Maybe<Array<SurchargeInput>>;
  updateShippingAddress?: Maybe<UpdateOrderAddressInput>;
  updateBillingAddress?: Maybe<UpdateOrderAddressInput>;
  note?: Maybe<Scalars['String']>;
  refund?: Maybe<AdministratorRefundInput>;
  options?: Maybe<ModifyOrderOptions>;
};

export type ModifyOrderOptions = {
  freezePromotions?: Maybe<Scalars['Boolean']>;
  recalculateShipping?: Maybe<Scalars['Boolean']>;
};

export type ModifyOrderResult = Order | NoChangesSpecifiedError | OrderModificationStateError | PaymentMethodMissingError | RefundPaymentIdMissingError | OrderLimitError | NegativeQuantityError | InsufficientStockError;

export type MoveCollectionInput = {
  collectionId: Scalars['ID'];
  parentId: Scalars['ID'];
  index: Scalars['Int'];
};

/** Returned if an operation has specified OrderLines from multiple Orders */
export type MultipleOrderError = ErrorResult & {
  __typename?: 'MultipleOrderError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new Administrator */
  createAdministrator: Administrator;
  /** Update an existing Administrator */
  updateAdministrator: Administrator;
  /** Update the active (currently logged-in) Administrator */
  updateActiveAdministrator: Administrator;
  /** Delete an Administrator */
  deleteAdministrator: DeletionResponse;
  /** Assign a Role to an Administrator */
  assignRoleToAdministrator: Administrator;
  /** Create a new Asset */
  createAssets: Array<CreateAssetResult>;
  /** Update an existing Asset */
  updateAsset: Asset;
  /** Delete an Asset */
  deleteAsset: DeletionResponse;
  /** Delete multiple Assets */
  deleteAssets: DeletionResponse;
  /** Assign assets to channel */
  assignAssetsToChannel: Array<Asset>;
  /** Authenticates the user using the native authentication strategy. This mutation is an alias for `authenticate({ native: { ... }})` */
  login: NativeAuthenticationResult;
  /** Authenticates the user using a named authentication strategy */
  authenticate: AuthenticationResult;
  logout: Success;
  /** Create a new Channel */
  createChannel: CreateChannelResult;
  /** Update an existing Channel */
  updateChannel: UpdateChannelResult;
  /** Delete a Channel */
  deleteChannel: DeletionResponse;
  /** Create a new Collection */
  createCollection: Collection;
  /** Update an existing Collection */
  updateCollection: Collection;
  /** Delete a Collection and all of its descendants */
  deleteCollection: DeletionResponse;
  /** Move a Collection to a different parent or index */
  moveCollection: Collection;
  /** Create a new Country */
  createCountry: Country;
  /** Update an existing Country */
  updateCountry: Country;
  /** Delete a Country */
  deleteCountry: DeletionResponse;
  /** Create a new CustomerGroup */
  createCustomerGroup: CustomerGroup;
  /** Update an existing CustomerGroup */
  updateCustomerGroup: CustomerGroup;
  /** Delete a CustomerGroup */
  deleteCustomerGroup: DeletionResponse;
  /** Add Customers to a CustomerGroup */
  addCustomersToGroup: CustomerGroup;
  /** Remove Customers from a CustomerGroup */
  removeCustomersFromGroup: CustomerGroup;
  /** Create a new Customer. If a password is provided, a new User will also be created an linked to the Customer. */
  createCustomer: CreateCustomerResult;
  /** Update an existing Customer */
  updateCustomer: UpdateCustomerResult;
  /** Delete a Customer */
  deleteCustomer: DeletionResponse;
  /** Create a new Address and associate it with the Customer specified by customerId */
  createCustomerAddress: Address;
  /** Update an existing Address */
  updateCustomerAddress: Address;
  /** Update an existing Address */
  deleteCustomerAddress: Success;
  addNoteToCustomer: Customer;
  updateCustomerNote: HistoryEntry;
  deleteCustomerNote: DeletionResponse;
  /** Create a new Facet */
  createFacet: Facet;
  /** Update an existing Facet */
  updateFacet: Facet;
  /** Delete an existing Facet */
  deleteFacet: DeletionResponse;
  /** Create one or more FacetValues */
  createFacetValues: Array<FacetValue>;
  /** Update one or more FacetValues */
  updateFacetValues: Array<FacetValue>;
  /** Delete one or more FacetValues */
  deleteFacetValues: Array<DeletionResponse>;
  updateGlobalSettings: UpdateGlobalSettingsResult;
  importProducts?: Maybe<ImportInfo>;
  /** Remove all settled jobs in the given queues older than the given date. Returns the number of jobs deleted. */
  removeSettledJobs: Scalars['Int'];
  cancelJob: Job;
  flushBufferedJobs: Success;
  settlePayment: SettlePaymentResult;
  addFulfillmentToOrder: AddFulfillmentToOrderResult;
  cancelOrder: CancelOrderResult;
  refundOrder: RefundOrderResult;
  settleRefund: SettleRefundResult;
  addNoteToOrder: Order;
  updateOrderNote: HistoryEntry;
  deleteOrderNote: DeletionResponse;
  transitionOrderToState?: Maybe<TransitionOrderToStateResult>;
  transitionFulfillmentToState: TransitionFulfillmentToStateResult;
  transitionPaymentToState: TransitionPaymentToStateResult;
  setOrderCustomFields?: Maybe<Order>;
  /**
   * Allows an Order to be modified after it has been completed by the Customer. The Order must first
   * be in the `Modifying` state.
   */
  modifyOrder: ModifyOrderResult;
  /**
   * Used to manually create a new Payment against an Order.
   * This can be used by an Administrator when an Order is in the ArrangingPayment state.
   *
   * It is also used when a completed Order
   * has been modified (using `modifyOrder`) and the price has increased. The extra payment
   * can then be manually arranged by the administrator, and the details used to create a new
   * Payment.
   */
  addManualPaymentToOrder: AddManualPaymentToOrderResult;
  /** Create existing PaymentMethod */
  createPaymentMethod: PaymentMethod;
  /** Update an existing PaymentMethod */
  updatePaymentMethod: PaymentMethod;
  /** Delete a PaymentMethod */
  deletePaymentMethod: DeletionResponse;
  /** Create a new ProductOptionGroup */
  createProductOptionGroup: ProductOptionGroup;
  /** Update an existing ProductOptionGroup */
  updateProductOptionGroup: ProductOptionGroup;
  /** Create a new ProductOption within a ProductOptionGroup */
  createProductOption: ProductOption;
  /** Create a new ProductOption within a ProductOptionGroup */
  updateProductOption: ProductOption;
  reindex: Job;
  runPendingSearchIndexUpdates: Success;
  /** Create a new Product */
  createProduct: Product;
  /** Update an existing Product */
  updateProduct: Product;
  /** Delete a Product */
  deleteProduct: DeletionResponse;
  /** Add an OptionGroup to a Product */
  addOptionGroupToProduct: Product;
  /** Remove an OptionGroup from a Product */
  removeOptionGroupFromProduct: RemoveOptionGroupFromProductResult;
  /** Create a set of ProductVariants based on the OptionGroups assigned to the given Product */
  createProductVariants: Array<Maybe<ProductVariant>>;
  /** Update existing ProductVariants */
  updateProductVariants: Array<Maybe<ProductVariant>>;
  /** Delete a ProductVariant */
  deleteProductVariant: DeletionResponse;
  /** Assigns all ProductVariants of Product to the specified Channel */
  assignProductsToChannel: Array<Product>;
  /** Removes all ProductVariants of Product from the specified Channel */
  removeProductsFromChannel: Array<Product>;
  /** Assigns ProductVariants to the specified Channel */
  assignProductVariantsToChannel: Array<ProductVariant>;
  /** Removes ProductVariants from the specified Channel */
  removeProductVariantsFromChannel: Array<ProductVariant>;
  createPromotion: CreatePromotionResult;
  updatePromotion: UpdatePromotionResult;
  deletePromotion: DeletionResponse;
  /** Assigns Promotions to the specified Channel */
  assignPromotionsToChannel: Array<Promotion>;
  /** Removes Promotions from the specified Channel */
  removePromotionsFromChannel: Array<Promotion>;
  /** Create a new Role */
  createRole: Role;
  /** Update an existing Role */
  updateRole: Role;
  /** Delete an existing Role */
  deleteRole: DeletionResponse;
  /** Create a new ShippingMethod */
  createShippingMethod: ShippingMethod;
  /** Update an existing ShippingMethod */
  updateShippingMethod: ShippingMethod;
  /** Delete a ShippingMethod */
  deleteShippingMethod: DeletionResponse;
  /** Create a new Tag */
  createTag: Tag;
  /** Update an existing Tag */
  updateTag: Tag;
  /** Delete an existing Tag */
  deleteTag: DeletionResponse;
  /** Create a new TaxCategory */
  createTaxCategory: TaxCategory;
  /** Update an existing TaxCategory */
  updateTaxCategory: TaxCategory;
  /** Deletes a TaxCategory */
  deleteTaxCategory: DeletionResponse;
  /** Create a new TaxRate */
  createTaxRate: TaxRate;
  /** Update an existing TaxRate */
  updateTaxRate: TaxRate;
  /** Delete a TaxRate */
  deleteTaxRate: DeletionResponse;
  /** Create a new Zone */
  createZone: Zone;
  /** Update an existing Zone */
  updateZone: Zone;
  /** Delete a Zone */
  deleteZone: DeletionResponse;
  /** Add members to a Zone */
  addMembersToZone: Zone;
  /** Remove members from a Zone */
  removeMembersFromZone: Zone;
  registerSupplierAccount: CreateSupplierResult;
  updateSupplier?: Maybe<Supplier>;
  createSupplierAddress?: Maybe<SupplierAddress>;
  updateSupplierAddress: SupplierAddress;
  createSupplierBankAccount?: Maybe<SupplierBankAccount>;
  updateSupplierBankAccount?: Maybe<SupplierBankAccount>;
  loadRewards: Customer;
  redeemRewards: Customer;
  addFulfillmentToOrderByVendor: AddFulfillmentToOrderResult;
  transitionFulfillmentToStateByVendor: TransitionFulfillmentToStateResult;
  createShoppingMall?: Maybe<ShoppingMall>;
  linkShoppingMallToChannelById?: Maybe<ShoppingMall>;
};


export type MutationcreateAdministratorArgs = {
  input: CreateAdministratorInput;
};


export type MutationupdateAdministratorArgs = {
  input: UpdateAdministratorInput;
};


export type MutationupdateActiveAdministratorArgs = {
  input: UpdateActiveAdministratorInput;
};


export type MutationdeleteAdministratorArgs = {
  id: Scalars['ID'];
};


export type MutationassignRoleToAdministratorArgs = {
  administratorId: Scalars['ID'];
  roleId: Scalars['ID'];
};


export type MutationcreateAssetsArgs = {
  input: Array<CreateAssetInput>;
};


export type MutationupdateAssetArgs = {
  input: UpdateAssetInput;
};


export type MutationdeleteAssetArgs = {
  input: DeleteAssetInput;
};


export type MutationdeleteAssetsArgs = {
  input: DeleteAssetsInput;
};


export type MutationassignAssetsToChannelArgs = {
  input: AssignAssetsToChannelInput;
};


export type MutationloginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  rememberMe?: Maybe<Scalars['Boolean']>;
};


export type MutationauthenticateArgs = {
  input: AuthenticationInput;
  rememberMe?: Maybe<Scalars['Boolean']>;
};


export type MutationcreateChannelArgs = {
  input: CreateChannelInput;
};


export type MutationupdateChannelArgs = {
  input: UpdateChannelInput;
};


export type MutationdeleteChannelArgs = {
  id: Scalars['ID'];
};


export type MutationcreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationupdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationdeleteCollectionArgs = {
  id: Scalars['ID'];
};


export type MutationmoveCollectionArgs = {
  input: MoveCollectionInput;
};


export type MutationcreateCountryArgs = {
  input: CreateCountryInput;
};


export type MutationupdateCountryArgs = {
  input: UpdateCountryInput;
};


export type MutationdeleteCountryArgs = {
  id: Scalars['ID'];
};


export type MutationcreateCustomerGroupArgs = {
  input: CreateCustomerGroupInput;
};


export type MutationupdateCustomerGroupArgs = {
  input: UpdateCustomerGroupInput;
};


export type MutationdeleteCustomerGroupArgs = {
  id: Scalars['ID'];
};


export type MutationaddCustomersToGroupArgs = {
  customerGroupId: Scalars['ID'];
  customerIds: Array<Scalars['ID']>;
};


export type MutationremoveCustomersFromGroupArgs = {
  customerGroupId: Scalars['ID'];
  customerIds: Array<Scalars['ID']>;
};


export type MutationcreateCustomerArgs = {
  input: CreateCustomerInput;
  password?: Maybe<Scalars['String']>;
};


export type MutationupdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationdeleteCustomerArgs = {
  id: Scalars['ID'];
};


export type MutationcreateCustomerAddressArgs = {
  customerId: Scalars['ID'];
  input: CreateAddressInput;
};


export type MutationupdateCustomerAddressArgs = {
  input: UpdateAddressInput;
};


export type MutationdeleteCustomerAddressArgs = {
  id: Scalars['ID'];
};


export type MutationaddNoteToCustomerArgs = {
  input: AddNoteToCustomerInput;
};


export type MutationupdateCustomerNoteArgs = {
  input: UpdateCustomerNoteInput;
};


export type MutationdeleteCustomerNoteArgs = {
  id: Scalars['ID'];
};


export type MutationcreateFacetArgs = {
  input: CreateFacetInput;
};


export type MutationupdateFacetArgs = {
  input: UpdateFacetInput;
};


export type MutationdeleteFacetArgs = {
  id: Scalars['ID'];
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationcreateFacetValuesArgs = {
  input: Array<CreateFacetValueInput>;
};


export type MutationupdateFacetValuesArgs = {
  input: Array<UpdateFacetValueInput>;
};


export type MutationdeleteFacetValuesArgs = {
  ids: Array<Scalars['ID']>;
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationupdateGlobalSettingsArgs = {
  input: UpdateGlobalSettingsInput;
};


export type MutationimportProductsArgs = {
  csvFile: Scalars['Upload'];
};


export type MutationremoveSettledJobsArgs = {
  queueNames?: Maybe<Array<Scalars['String']>>;
  olderThan?: Maybe<Scalars['DateTime']>;
};


export type MutationcancelJobArgs = {
  jobId: Scalars['ID'];
};


export type MutationflushBufferedJobsArgs = {
  bufferIds?: Maybe<Array<Scalars['String']>>;
};


export type MutationsettlePaymentArgs = {
  id: Scalars['ID'];
};


export type MutationaddFulfillmentToOrderArgs = {
  input: FulfillOrderInput;
};


export type MutationcancelOrderArgs = {
  input: CancelOrderInput;
};


export type MutationrefundOrderArgs = {
  input: RefundOrderInput;
};


export type MutationsettleRefundArgs = {
  input: SettleRefundInput;
};


export type MutationaddNoteToOrderArgs = {
  input: AddNoteToOrderInput;
};


export type MutationupdateOrderNoteArgs = {
  input: UpdateOrderNoteInput;
};


export type MutationdeleteOrderNoteArgs = {
  id: Scalars['ID'];
};


export type MutationtransitionOrderToStateArgs = {
  id: Scalars['ID'];
  state: Scalars['String'];
};


export type MutationtransitionFulfillmentToStateArgs = {
  id: Scalars['ID'];
  state: Scalars['String'];
};


export type MutationtransitionPaymentToStateArgs = {
  id: Scalars['ID'];
  state: Scalars['String'];
};


export type MutationsetOrderCustomFieldsArgs = {
  input: UpdateOrderInput;
};


export type MutationmodifyOrderArgs = {
  input: ModifyOrderInput;
};


export type MutationaddManualPaymentToOrderArgs = {
  input: ManualPaymentInput;
};


export type MutationcreatePaymentMethodArgs = {
  input: CreatePaymentMethodInput;
};


export type MutationupdatePaymentMethodArgs = {
  input: UpdatePaymentMethodInput;
};


export type MutationdeletePaymentMethodArgs = {
  id: Scalars['ID'];
  force?: Maybe<Scalars['Boolean']>;
};


export type MutationcreateProductOptionGroupArgs = {
  input: CreateProductOptionGroupInput;
};


export type MutationupdateProductOptionGroupArgs = {
  input: UpdateProductOptionGroupInput;
};


export type MutationcreateProductOptionArgs = {
  input: CreateProductOptionInput;
};


export type MutationupdateProductOptionArgs = {
  input: UpdateProductOptionInput;
};


export type MutationcreateProductArgs = {
  input: CreateProductInput;
};


export type MutationupdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationdeleteProductArgs = {
  id: Scalars['ID'];
};


export type MutationaddOptionGroupToProductArgs = {
  productId: Scalars['ID'];
  optionGroupId: Scalars['ID'];
};


export type MutationremoveOptionGroupFromProductArgs = {
  productId: Scalars['ID'];
  optionGroupId: Scalars['ID'];
};


export type MutationcreateProductVariantsArgs = {
  input: Array<CreateProductVariantInput>;
};


export type MutationupdateProductVariantsArgs = {
  input: Array<UpdateProductVariantInput>;
};


export type MutationdeleteProductVariantArgs = {
  id: Scalars['ID'];
};


export type MutationassignProductsToChannelArgs = {
  input: AssignProductsToChannelInput;
};


export type MutationremoveProductsFromChannelArgs = {
  input: RemoveProductsFromChannelInput;
};


export type MutationassignProductVariantsToChannelArgs = {
  input: AssignProductVariantsToChannelInput;
};


export type MutationremoveProductVariantsFromChannelArgs = {
  input: RemoveProductVariantsFromChannelInput;
};


export type MutationcreatePromotionArgs = {
  input: CreatePromotionInput;
};


export type MutationupdatePromotionArgs = {
  input: UpdatePromotionInput;
};


export type MutationdeletePromotionArgs = {
  id: Scalars['ID'];
};


export type MutationassignPromotionsToChannelArgs = {
  input: AssignPromotionsToChannelInput;
};


export type MutationremovePromotionsFromChannelArgs = {
  input: RemovePromotionsFromChannelInput;
};


export type MutationcreateRoleArgs = {
  input: CreateRoleInput;
};


export type MutationupdateRoleArgs = {
  input: UpdateRoleInput;
};


export type MutationdeleteRoleArgs = {
  id: Scalars['ID'];
};


export type MutationcreateShippingMethodArgs = {
  input: CreateShippingMethodInput;
};


export type MutationupdateShippingMethodArgs = {
  input: UpdateShippingMethodInput;
};


export type MutationdeleteShippingMethodArgs = {
  id: Scalars['ID'];
};


export type MutationcreateTagArgs = {
  input: CreateTagInput;
};


export type MutationupdateTagArgs = {
  input: UpdateTagInput;
};


export type MutationdeleteTagArgs = {
  id: Scalars['ID'];
};


export type MutationcreateTaxCategoryArgs = {
  input: CreateTaxCategoryInput;
};


export type MutationupdateTaxCategoryArgs = {
  input: UpdateTaxCategoryInput;
};


export type MutationdeleteTaxCategoryArgs = {
  id: Scalars['ID'];
};


export type MutationcreateTaxRateArgs = {
  input: CreateTaxRateInput;
};


export type MutationupdateTaxRateArgs = {
  input: UpdateTaxRateInput;
};


export type MutationdeleteTaxRateArgs = {
  id: Scalars['ID'];
};


export type MutationcreateZoneArgs = {
  input: CreateZoneInput;
};


export type MutationupdateZoneArgs = {
  input: UpdateZoneInput;
};


export type MutationdeleteZoneArgs = {
  id: Scalars['ID'];
};


export type MutationaddMembersToZoneArgs = {
  zoneId: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
};


export type MutationremoveMembersFromZoneArgs = {
  zoneId: Scalars['ID'];
  memberIds: Array<Scalars['ID']>;
};


export type MutationregisterSupplierAccountArgs = {
  input: CreateSupplierInput;
};


export type MutationupdateSupplierArgs = {
  input: UpdateSupplierInput;
};


export type MutationcreateSupplierAddressArgs = {
  input: CreateSupplierAddressInput;
};


export type MutationupdateSupplierAddressArgs = {
  input: UpdateSupplierAddressInput;
};


export type MutationcreateSupplierBankAccountArgs = {
  input: CreateSupplierBankAccountInput;
};


export type MutationupdateSupplierBankAccountArgs = {
  input: UpdateSupplierBankAccountInput;
};


export type MutationloadRewardsArgs = {
  input: LoadRewardsInput;
};


export type MutationredeemRewardsArgs = {
  input: RedeemInput;
};


export type MutationaddFulfillmentToOrderByVendorArgs = {
  input: FulfillOrderInput;
};


export type MutationtransitionFulfillmentToStateByVendorArgs = {
  id: Scalars['ID'];
  state: Scalars['String'];
};


export type MutationcreateShoppingMallArgs = {
  input: ShoppingMallInput;
};


export type MutationlinkShoppingMallToChannelByIdArgs = {
  input: ShoppingMallLinkInput;
};

export type NativeAuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

/** Retured when attempting an operation that relies on the NativeAuthStrategy, if that strategy is not configured. */
export type NativeAuthStrategyError = ErrorResult & {
  __typename?: 'NativeAuthStrategyError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type NativeAuthenticationResult = CurrentUser | InvalidCredentialsError | NativeAuthStrategyError;

/** Retured when attemting to set a negative OrderLine quantity. */
export type NegativeQuantityError = ErrorResult & {
  __typename?: 'NegativeQuantityError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type NextTier = {
  __typename?: 'NextTier';
  tier?: Maybe<Scalars['String']>;
  min?: Maybe<Scalars['Int']>;
};

/** Returned when a call to modifyOrder fails to specify any changes */
export type NoChangesSpecifiedError = ErrorResult & {
  __typename?: 'NoChangesSpecifiedError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

/** Returned if an attempting to refund an Order but neither items nor shipping refund was specified */
export type NothingToRefundError = ErrorResult & {
  __typename?: 'NothingToRefundError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  eq?: Maybe<Scalars['Float']>;
  lt?: Maybe<Scalars['Float']>;
  lte?: Maybe<Scalars['Float']>;
  gt?: Maybe<Scalars['Float']>;
  gte?: Maybe<Scalars['Float']>;
  between?: Maybe<NumberRange>;
};

export type NumberRange = {
  start: Scalars['Float'];
  end: Scalars['Float'];
};

export type Order = Node & {
  __typename?: 'Order';
  nextStates: Array<Scalars['String']>;
  modifications: Array<OrderModification>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  /**
   * The date & time that the Order was placed, i.e. the Customer
   * completed the checkout and the Order is no longer "active"
   */
  orderPlacedAt?: Maybe<Scalars['DateTime']>;
  /** A unique code for the Order */
  code: Scalars['String'];
  state: Scalars['String'];
  /** An order is active as long as the payment process has not been completed */
  active: Scalars['Boolean'];
  customer?: Maybe<Customer>;
  shippingAddress?: Maybe<OrderAddress>;
  billingAddress?: Maybe<OrderAddress>;
  lines: Array<OrderLine>;
  /**
   * Surcharges are arbitrary modifications to the Order total which are neither
   * ProductVariants nor discounts resulting from applied Promotions. For example,
   * one-off discounts based on customer interaction, or surcharges based on payment
   * methods.
   */
  surcharges: Array<Surcharge>;
  discounts: Array<Discount>;
  /** An array of all coupon codes applied to the Order */
  couponCodes: Array<Scalars['String']>;
  /** Promotions applied to the order. Only gets populated after the payment process has completed. */
  promotions: Array<Promotion>;
  payments?: Maybe<Array<Payment>>;
  fulfillments?: Maybe<Array<Fulfillment>>;
  totalQuantity: Scalars['Int'];
  /**
   * The subTotal is the total of all OrderLines in the Order. This figure also includes any Order-level
   * discounts which have been prorated (proportionally distributed) amongst the OrderItems.
   * To get a total of all OrderLines which does not account for prorated discounts, use the
   * sum of `OrderLine.discountedLinePrice` values.
   */
  subTotal: Scalars['Int'];
  /** Same as subTotal, but inclusive of tax */
  subTotalWithTax: Scalars['Int'];
  currencyCode: CurrencyCode;
  shippingLines: Array<ShippingLine>;
  shipping: Scalars['Int'];
  shippingWithTax: Scalars['Int'];
  /** Equal to subTotal plus shipping */
  total: Scalars['Int'];
  /** The final payable amount. Equal to subTotalWithTax plus shippingWithTax */
  totalWithTax: Scalars['Int'];
  /** A summary of the taxes being applied to this Order */
  taxSummary: Array<OrderTaxSummary>;
  history: HistoryEntryList;
  customFields?: Maybe<Scalars['JSON']>;
};


export type OrderhistoryArgs = {
  options?: Maybe<HistoryEntryListOptions>;
};

export type OrderAddress = {
  __typename?: 'OrderAddress';
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type OrderFilterParameter = {
  customerLastName?: Maybe<StringOperators>;
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  orderPlacedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  active?: Maybe<BooleanOperators>;
  totalQuantity?: Maybe<NumberOperators>;
  subTotal?: Maybe<NumberOperators>;
  subTotalWithTax?: Maybe<NumberOperators>;
  currencyCode?: Maybe<StringOperators>;
  shipping?: Maybe<NumberOperators>;
  shippingWithTax?: Maybe<NumberOperators>;
  total?: Maybe<NumberOperators>;
  totalWithTax?: Maybe<NumberOperators>;
};

export type OrderItem = Node & {
  __typename?: 'OrderItem';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  cancelled: Scalars['Boolean'];
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Int'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Int'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Int'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Int'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Int'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Int'];
  unitTax: Scalars['Int'];
  taxRate: Scalars['Float'];
  adjustments: Array<Adjustment>;
  taxLines: Array<TaxLine>;
  fulfillment?: Maybe<Fulfillment>;
  refundId?: Maybe<Scalars['ID']>;
};

/** Retured when the maximum order size limit has been reached. */
export type OrderLimitError = ErrorResult & {
  __typename?: 'OrderLimitError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  maxItems: Scalars['Int'];
};

export type OrderLine = Node & {
  __typename?: 'OrderLine';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  featuredAsset?: Maybe<Asset>;
  /** The price of a single unit, excluding tax and discounts */
  unitPrice: Scalars['Int'];
  /** The price of a single unit, including tax but excluding discounts */
  unitPriceWithTax: Scalars['Int'];
  /** Non-zero if the unitPrice has changed since it was initially added to Order */
  unitPriceChangeSinceAdded: Scalars['Int'];
  /** Non-zero if the unitPriceWithTax has changed since it was initially added to Order */
  unitPriceWithTaxChangeSinceAdded: Scalars['Int'];
  /**
   * The price of a single unit including discounts, excluding tax.
   *
   * If Order-level discounts have been applied, this will not be the
   * actual taxable unit price (see `proratedUnitPrice`), but is generally the
   * correct price to display to customers to avoid confusion
   * about the internal handling of distributed Order-level discounts.
   */
  discountedUnitPrice: Scalars['Int'];
  /** The price of a single unit including discounts and tax */
  discountedUnitPriceWithTax: Scalars['Int'];
  /**
   * The actual unit price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderItem, and is used in tax
   * and refund calculations.
   */
  proratedUnitPrice: Scalars['Int'];
  /** The proratedUnitPrice including tax */
  proratedUnitPriceWithTax: Scalars['Int'];
  quantity: Scalars['Int'];
  items: Array<OrderItem>;
  taxRate: Scalars['Float'];
  /** The total price of the line excluding tax and discounts. */
  linePrice: Scalars['Int'];
  /** The total price of the line including tax but excluding discounts. */
  linePriceWithTax: Scalars['Int'];
  /** The price of the line including discounts, excluding tax */
  discountedLinePrice: Scalars['Int'];
  /** The price of the line including discounts and tax */
  discountedLinePriceWithTax: Scalars['Int'];
  /**
   * The actual line price, taking into account both item discounts _and_ prorated (proportionally-distributed)
   * Order-level discounts. This value is the true economic value of the OrderLine, and is used in tax
   * and refund calculations.
   */
  proratedLinePrice: Scalars['Int'];
  /** The proratedLinePrice including tax */
  proratedLinePriceWithTax: Scalars['Int'];
  /** The total tax on this line */
  lineTax: Scalars['Int'];
  discounts: Array<Discount>;
  taxLines: Array<TaxLine>;
  order: Order;
  customFields?: Maybe<Scalars['JSON']>;
};

export type OrderLineInput = {
  orderLineId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type OrderList = PaginatedList & {
  __typename?: 'OrderList';
  items: Array<Order>;
  totalItems: Scalars['Int'];
};

export type OrderListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<OrderSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<OrderFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type OrderModification = Node & {
  __typename?: 'OrderModification';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  priceChange: Scalars['Int'];
  note: Scalars['String'];
  orderItems?: Maybe<Array<OrderItem>>;
  surcharges?: Maybe<Array<Surcharge>>;
  payment?: Maybe<Payment>;
  refund?: Maybe<Refund>;
  isSettled: Scalars['Boolean'];
};

/** Returned when attempting to modify the contents of an Order that is not in the `Modifying` state. */
export type OrderModificationStateError = ErrorResult & {
  __typename?: 'OrderModificationStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type OrderProcessState = {
  __typename?: 'OrderProcessState';
  name: Scalars['String'];
  to: Array<Scalars['String']>;
};

export type OrderSortParameter = {
  customerLastName?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  orderPlacedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  totalQuantity?: Maybe<SortOrder>;
  subTotal?: Maybe<SortOrder>;
  subTotalWithTax?: Maybe<SortOrder>;
  shipping?: Maybe<SortOrder>;
  shippingWithTax?: Maybe<SortOrder>;
  total?: Maybe<SortOrder>;
  totalWithTax?: Maybe<SortOrder>;
};

/** Returned if there is an error in transitioning the Order state */
export type OrderStateTransitionError = ErrorResult & {
  __typename?: 'OrderStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

/**
 * A summary of the taxes being applied to this order, grouped
 * by taxRate.
 */
export type OrderTaxSummary = {
  __typename?: 'OrderTaxSummary';
  /** A description of this tax */
  description: Scalars['String'];
  /** The taxRate as a percentage */
  taxRate: Scalars['Float'];
  /** The total net price or OrderItems to which this taxRate applies */
  taxBase: Scalars['Int'];
  /** The total tax being applied to the Order at this taxRate */
  taxTotal: Scalars['Int'];
};

export type PaginatedList = {
  items: Array<Node>;
  totalItems: Scalars['Int'];
};

export type Payment = Node & {
  __typename?: 'Payment';
  nextStates: Array<Scalars['String']>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  method: Scalars['String'];
  amount: Scalars['Int'];
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  errorMessage?: Maybe<Scalars['String']>;
  refunds: Array<Refund>;
  metadata?: Maybe<Scalars['JSON']>;
};

export type PaymentMethod = Node & {
  __typename?: 'PaymentMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  code: Scalars['String'];
  description: Scalars['String'];
  enabled: Scalars['Boolean'];
  checker?: Maybe<ConfigurableOperation>;
  handler: ConfigurableOperation;
  customFields?: Maybe<Scalars['JSON']>;
};

export type PaymentMethodFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  code?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
};

export type PaymentMethodList = PaginatedList & {
  __typename?: 'PaymentMethodList';
  items: Array<PaymentMethod>;
  totalItems: Scalars['Int'];
};

export type PaymentMethodListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<PaymentMethodSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<PaymentMethodFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

/**
 * Returned when a call to modifyOrder fails to include a paymentMethod even
 * though the price has increased as a result of the changes.
 */
export type PaymentMethodMissingError = ErrorResult & {
  __typename?: 'PaymentMethodMissingError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type PaymentMethodQuote = {
  __typename?: 'PaymentMethodQuote';
  id: Scalars['ID'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  isEligible: Scalars['Boolean'];
  eligibilityMessage?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type PaymentMethodSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

/** Returned if an attempting to refund a Payment against OrderLines from a different Order */
export type PaymentOrderMismatchError = ErrorResult & {
  __typename?: 'PaymentOrderMismatchError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when there is an error in transitioning the Payment state */
export type PaymentStateTransitionError = ErrorResult & {
  __typename?: 'PaymentStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

/**
 * @description
 * Permissions for administrators and customers. Used to control access to
 * GraphQL resolvers via the {@link Allow} decorator.
 *
 * @docsCategory common
 */
export enum Permission {
  /** Authenticated means simply that the user is logged in */
  Authenticated = 'Authenticated',
  /** SuperAdmin has unrestricted access to all operations */
  SuperAdmin = 'SuperAdmin',
  /** Owner means the user owns this entity, e.g. a Customer's own Order */
  Owner = 'Owner',
  /** Public means any unauthenticated user may perform the operation */
  Public = 'Public',
  /** Grants permission to update GlobalSettings */
  UpdateGlobalSettings = 'UpdateGlobalSettings',
  /** Grants permission to create Products, Facets, Assets, Collections */
  CreateCatalog = 'CreateCatalog',
  /** Grants permission to read Products, Facets, Assets, Collections */
  ReadCatalog = 'ReadCatalog',
  /** Grants permission to update Products, Facets, Assets, Collections */
  UpdateCatalog = 'UpdateCatalog',
  /** Grants permission to delete Products, Facets, Assets, Collections */
  DeleteCatalog = 'DeleteCatalog',
  /** Grants permission to create PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  CreateSettings = 'CreateSettings',
  /** Grants permission to read PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  ReadSettings = 'ReadSettings',
  /** Grants permission to update PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  UpdateSettings = 'UpdateSettings',
  /** Grants permission to delete PaymentMethods, ShippingMethods, TaxCategories, TaxRates, Zones, Countries, System & GlobalSettings */
  DeleteSettings = 'DeleteSettings',
  /** Grants permission to create Administrator */
  CreateAdministrator = 'CreateAdministrator',
  /** Grants permission to read Administrator */
  ReadAdministrator = 'ReadAdministrator',
  /** Grants permission to update Administrator */
  UpdateAdministrator = 'UpdateAdministrator',
  /** Grants permission to delete Administrator */
  DeleteAdministrator = 'DeleteAdministrator',
  /** Grants permission to create Asset */
  CreateAsset = 'CreateAsset',
  /** Grants permission to read Asset */
  ReadAsset = 'ReadAsset',
  /** Grants permission to update Asset */
  UpdateAsset = 'UpdateAsset',
  /** Grants permission to delete Asset */
  DeleteAsset = 'DeleteAsset',
  /** Grants permission to create Channel */
  CreateChannel = 'CreateChannel',
  /** Grants permission to read Channel */
  ReadChannel = 'ReadChannel',
  /** Grants permission to update Channel */
  UpdateChannel = 'UpdateChannel',
  /** Grants permission to delete Channel */
  DeleteChannel = 'DeleteChannel',
  /** Grants permission to create Collection */
  CreateCollection = 'CreateCollection',
  /** Grants permission to read Collection */
  ReadCollection = 'ReadCollection',
  /** Grants permission to update Collection */
  UpdateCollection = 'UpdateCollection',
  /** Grants permission to delete Collection */
  DeleteCollection = 'DeleteCollection',
  /** Grants permission to create Country */
  CreateCountry = 'CreateCountry',
  /** Grants permission to read Country */
  ReadCountry = 'ReadCountry',
  /** Grants permission to update Country */
  UpdateCountry = 'UpdateCountry',
  /** Grants permission to delete Country */
  DeleteCountry = 'DeleteCountry',
  /** Grants permission to create Customer */
  CreateCustomer = 'CreateCustomer',
  /** Grants permission to read Customer */
  ReadCustomer = 'ReadCustomer',
  /** Grants permission to update Customer */
  UpdateCustomer = 'UpdateCustomer',
  /** Grants permission to delete Customer */
  DeleteCustomer = 'DeleteCustomer',
  /** Grants permission to create CustomerGroup */
  CreateCustomerGroup = 'CreateCustomerGroup',
  /** Grants permission to read CustomerGroup */
  ReadCustomerGroup = 'ReadCustomerGroup',
  /** Grants permission to update CustomerGroup */
  UpdateCustomerGroup = 'UpdateCustomerGroup',
  /** Grants permission to delete CustomerGroup */
  DeleteCustomerGroup = 'DeleteCustomerGroup',
  /** Grants permission to create Facet */
  CreateFacet = 'CreateFacet',
  /** Grants permission to read Facet */
  ReadFacet = 'ReadFacet',
  /** Grants permission to update Facet */
  UpdateFacet = 'UpdateFacet',
  /** Grants permission to delete Facet */
  DeleteFacet = 'DeleteFacet',
  /** Grants permission to create Order */
  CreateOrder = 'CreateOrder',
  /** Grants permission to read Order */
  ReadOrder = 'ReadOrder',
  /** Grants permission to update Order */
  UpdateOrder = 'UpdateOrder',
  /** Grants permission to delete Order */
  DeleteOrder = 'DeleteOrder',
  /** Grants permission to create PaymentMethod */
  CreatePaymentMethod = 'CreatePaymentMethod',
  /** Grants permission to read PaymentMethod */
  ReadPaymentMethod = 'ReadPaymentMethod',
  /** Grants permission to update PaymentMethod */
  UpdatePaymentMethod = 'UpdatePaymentMethod',
  /** Grants permission to delete PaymentMethod */
  DeletePaymentMethod = 'DeletePaymentMethod',
  /** Grants permission to create Product */
  CreateProduct = 'CreateProduct',
  /** Grants permission to read Product */
  ReadProduct = 'ReadProduct',
  /** Grants permission to update Product */
  UpdateProduct = 'UpdateProduct',
  /** Grants permission to delete Product */
  DeleteProduct = 'DeleteProduct',
  /** Grants permission to create Promotion */
  CreatePromotion = 'CreatePromotion',
  /** Grants permission to read Promotion */
  ReadPromotion = 'ReadPromotion',
  /** Grants permission to update Promotion */
  UpdatePromotion = 'UpdatePromotion',
  /** Grants permission to delete Promotion */
  DeletePromotion = 'DeletePromotion',
  /** Grants permission to create ShippingMethod */
  CreateShippingMethod = 'CreateShippingMethod',
  /** Grants permission to read ShippingMethod */
  ReadShippingMethod = 'ReadShippingMethod',
  /** Grants permission to update ShippingMethod */
  UpdateShippingMethod = 'UpdateShippingMethod',
  /** Grants permission to delete ShippingMethod */
  DeleteShippingMethod = 'DeleteShippingMethod',
  /** Grants permission to create Tag */
  CreateTag = 'CreateTag',
  /** Grants permission to read Tag */
  ReadTag = 'ReadTag',
  /** Grants permission to update Tag */
  UpdateTag = 'UpdateTag',
  /** Grants permission to delete Tag */
  DeleteTag = 'DeleteTag',
  /** Grants permission to create TaxCategory */
  CreateTaxCategory = 'CreateTaxCategory',
  /** Grants permission to read TaxCategory */
  ReadTaxCategory = 'ReadTaxCategory',
  /** Grants permission to update TaxCategory */
  UpdateTaxCategory = 'UpdateTaxCategory',
  /** Grants permission to delete TaxCategory */
  DeleteTaxCategory = 'DeleteTaxCategory',
  /** Grants permission to create TaxRate */
  CreateTaxRate = 'CreateTaxRate',
  /** Grants permission to read TaxRate */
  ReadTaxRate = 'ReadTaxRate',
  /** Grants permission to update TaxRate */
  UpdateTaxRate = 'UpdateTaxRate',
  /** Grants permission to delete TaxRate */
  DeleteTaxRate = 'DeleteTaxRate',
  /** Grants permission to create System */
  CreateSystem = 'CreateSystem',
  /** Grants permission to read System */
  ReadSystem = 'ReadSystem',
  /** Grants permission to update System */
  UpdateSystem = 'UpdateSystem',
  /** Grants permission to delete System */
  DeleteSystem = 'DeleteSystem',
  /** Grants permission to create Zone */
  CreateZone = 'CreateZone',
  /** Grants permission to read Zone */
  ReadZone = 'ReadZone',
  /** Grants permission to update Zone */
  UpdateZone = 'UpdateZone',
  /** Grants permission to delete Zone */
  DeleteZone = 'DeleteZone'
}

export type PermissionDefinition = {
  __typename?: 'PermissionDefinition';
  name: Scalars['String'];
  description: Scalars['String'];
  assignable: Scalars['Boolean'];
};

/** The price range where the result has more than one price */
export type PriceRange = {
  __typename?: 'PriceRange';
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type PriceRangeBucket = {
  __typename?: 'PriceRangeBucket';
  to: Scalars['Int'];
  count: Scalars['Int'];
};

export type PriceRangeInput = {
  min: Scalars['Int'];
  max: Scalars['Int'];
};

export type Product = Node & {
  __typename?: 'Product';
  enabled: Scalars['Boolean'];
  channels: Array<Channel>;
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  /** Returns all ProductVariants */
  variants: Array<ProductVariant>;
  /** Returns a paginated, sortable, filterable list of ProductVariants */
  variantList: ProductVariantList;
  optionGroups: Array<ProductOptionGroup>;
  facetValues: Array<FacetValue>;
  translations: Array<ProductTranslation>;
  collections: Array<Collection>;
  customFields?: Maybe<ProductCustomFields>;
};


export type ProductvariantListArgs = {
  options?: Maybe<ProductVariantListOptions>;
};

export type ProductCustomFields = {
  __typename?: 'ProductCustomFields';
  vendor?: Maybe<Scalars['String']>;
  country_of_origin?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
};

export type ProductFilterParameter = {
  enabled?: Maybe<BooleanOperators>;
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  slug?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
  vendor?: Maybe<StringOperators>;
  country_of_origin?: Maybe<StringOperators>;
  manufacturer?: Maybe<StringOperators>;
};

export type ProductList = PaginatedList & {
  __typename?: 'ProductList';
  items: Array<Product>;
  totalItems: Scalars['Int'];
};

export type ProductListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<ProductSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<ProductFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type ProductOption = Node & {
  __typename?: 'ProductOption';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  groupId: Scalars['ID'];
  group: ProductOptionGroup;
  translations: Array<ProductOptionTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionGroup = Node & {
  __typename?: 'ProductOptionGroup';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  code: Scalars['String'];
  name: Scalars['String'];
  options: Array<ProductOption>;
  translations: Array<ProductOptionGroupTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionGroupTranslation = {
  __typename?: 'ProductOptionGroupTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductOptionGroupTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductOptionInUseError = ErrorResult & {
  __typename?: 'ProductOptionInUseError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  optionGroupCode: Scalars['String'];
  productVariantCount: Scalars['Int'];
};

export type ProductOptionTranslation = {
  __typename?: 'ProductOptionTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductOptionTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  slug?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  vendor?: Maybe<SortOrder>;
  country_of_origin?: Maybe<SortOrder>;
  manufacturer?: Maybe<SortOrder>;
};

export type ProductTranslation = {
  __typename?: 'ProductTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  slug: Scalars['String'];
  description: Scalars['String'];
};

export type ProductTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ProductVariant = Node & {
  __typename?: 'ProductVariant';
  enabled: Scalars['Boolean'];
  trackInventory: GlobalFlag;
  stockOnHand: Scalars['Int'];
  stockAllocated: Scalars['Int'];
  outOfStockThreshold: Scalars['Int'];
  useGlobalOutOfStockThreshold: Scalars['Boolean'];
  stockMovements: StockMovementList;
  channels: Array<Channel>;
  id: Scalars['ID'];
  product: Product;
  productId: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  sku: Scalars['String'];
  name: Scalars['String'];
  featuredAsset?: Maybe<Asset>;
  assets: Array<Asset>;
  price: Scalars['Int'];
  currencyCode: CurrencyCode;
  priceWithTax: Scalars['Int'];
  stockLevel: Scalars['String'];
  taxRateApplied: TaxRate;
  taxCategory: TaxCategory;
  options: Array<ProductOption>;
  facetValues: Array<FacetValue>;
  translations: Array<ProductVariantTranslation>;
  customFields?: Maybe<ProductVariantCustomFields>;
};


export type ProductVariantstockMovementsArgs = {
  options?: Maybe<StockMovementListOptions>;
};

export type ProductVariantCustomFields = {
  __typename?: 'ProductVariantCustomFields';
  originalPriceWithTax?: Maybe<Scalars['Int']>;
  costPrice?: Maybe<Scalars['Int']>;
  dimension_length?: Maybe<Scalars['Float']>;
  dimension_length_unit?: Maybe<Scalars['String']>;
  dimension_breadth?: Maybe<Scalars['Float']>;
  dimension_breadth_unit?: Maybe<Scalars['String']>;
  dimension_height?: Maybe<Scalars['Float']>;
  dimension_height_unit?: Maybe<Scalars['String']>;
  dimension_weight?: Maybe<Scalars['Float']>;
  dimension_weight_unit?: Maybe<Scalars['String']>;
};

export type ProductVariantFilterParameter = {
  enabled?: Maybe<BooleanOperators>;
  trackInventory?: Maybe<StringOperators>;
  stockOnHand?: Maybe<NumberOperators>;
  stockAllocated?: Maybe<NumberOperators>;
  outOfStockThreshold?: Maybe<NumberOperators>;
  useGlobalOutOfStockThreshold?: Maybe<BooleanOperators>;
  id?: Maybe<IDOperators>;
  productId?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  languageCode?: Maybe<StringOperators>;
  sku?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  price?: Maybe<NumberOperators>;
  currencyCode?: Maybe<StringOperators>;
  priceWithTax?: Maybe<NumberOperators>;
  stockLevel?: Maybe<StringOperators>;
  originalPriceWithTax?: Maybe<NumberOperators>;
  costPrice?: Maybe<NumberOperators>;
  dimension_length?: Maybe<NumberOperators>;
  dimension_length_unit?: Maybe<StringOperators>;
  dimension_breadth?: Maybe<NumberOperators>;
  dimension_breadth_unit?: Maybe<StringOperators>;
  dimension_height?: Maybe<NumberOperators>;
  dimension_height_unit?: Maybe<StringOperators>;
  dimension_weight?: Maybe<NumberOperators>;
  dimension_weight_unit?: Maybe<StringOperators>;
};

export type ProductVariantList = PaginatedList & {
  __typename?: 'ProductVariantList';
  items: Array<ProductVariant>;
  totalItems: Scalars['Int'];
};

export type ProductVariantListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<ProductVariantSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<ProductVariantFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type ProductVariantSortParameter = {
  stockOnHand?: Maybe<SortOrder>;
  stockAllocated?: Maybe<SortOrder>;
  outOfStockThreshold?: Maybe<SortOrder>;
  id?: Maybe<SortOrder>;
  productId?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  sku?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
  priceWithTax?: Maybe<SortOrder>;
  stockLevel?: Maybe<SortOrder>;
  originalPriceWithTax?: Maybe<SortOrder>;
  costPrice?: Maybe<SortOrder>;
  dimension_length?: Maybe<SortOrder>;
  dimension_length_unit?: Maybe<SortOrder>;
  dimension_breadth?: Maybe<SortOrder>;
  dimension_breadth_unit?: Maybe<SortOrder>;
  dimension_height?: Maybe<SortOrder>;
  dimension_height_unit?: Maybe<SortOrder>;
  dimension_weight?: Maybe<SortOrder>;
  dimension_weight_unit?: Maybe<SortOrder>;
};

export type ProductVariantTranslation = {
  __typename?: 'ProductVariantTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
};

export type ProductVariantTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Promotion = Node & {
  __typename?: 'Promotion';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  conditions: Array<ConfigurableOperation>;
  actions: Array<ConfigurableOperation>;
  customFields?: Maybe<PromotionCustomFields>;
};

export type PromotionCustomFields = {
  __typename?: 'PromotionCustomFields';
  isDefault?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type PromotionFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  startsAt?: Maybe<DateOperators>;
  endsAt?: Maybe<DateOperators>;
  couponCode?: Maybe<StringOperators>;
  perCustomerUsageLimit?: Maybe<NumberOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
  isDefault?: Maybe<BooleanOperators>;
  type?: Maybe<StringOperators>;
};

export type PromotionList = PaginatedList & {
  __typename?: 'PromotionList';
  items: Array<Promotion>;
  totalItems: Scalars['Int'];
};

export type PromotionListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<PromotionSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<PromotionFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type PromotionSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  startsAt?: Maybe<SortOrder>;
  endsAt?: Maybe<SortOrder>;
  couponCode?: Maybe<SortOrder>;
  perCustomerUsageLimit?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  isDefault?: Maybe<SortOrder>;
  type?: Maybe<SortOrder>;
};

/** Returned if the specified quantity of an OrderLine is greater than the number of items in that line */
export type QuantityTooGreatError = ErrorResult & {
  __typename?: 'QuantityTooGreatError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  administrators: AdministratorList;
  administrator?: Maybe<Administrator>;
  activeAdministrator?: Maybe<Administrator>;
  /** Get a list of Assets */
  assets: AssetList;
  /** Get a single Asset by id */
  asset?: Maybe<Asset>;
  me?: Maybe<CurrentUser>;
  channels: Array<Channel>;
  channel?: Maybe<Channel>;
  activeChannel: Channel;
  collections: CollectionList;
  /** Get a Collection either by id or slug. If neither id nor slug is specified, an error will result. */
  collection?: Maybe<Collection>;
  collectionFilters: Array<ConfigurableOperationDefinition>;
  countries: CountryList;
  country?: Maybe<Country>;
  customerGroups: CustomerGroupList;
  customerGroup?: Maybe<CustomerGroup>;
  customers: CustomerList;
  customer?: Maybe<Customer>;
  facets: FacetList;
  facet?: Maybe<Facet>;
  globalSettings: GlobalSettings;
  job?: Maybe<Job>;
  jobs: JobList;
  jobsById: Array<Job>;
  jobQueues: Array<JobQueue>;
  jobBufferSize: Array<JobBufferSize>;
  order?: Maybe<Order>;
  orders: OrderList;
  paymentMethods: PaymentMethodList;
  paymentMethod?: Maybe<PaymentMethod>;
  paymentMethodEligibilityCheckers: Array<ConfigurableOperationDefinition>;
  paymentMethodHandlers: Array<ConfigurableOperationDefinition>;
  productOptionGroups: Array<ProductOptionGroup>;
  productOptionGroup?: Maybe<ProductOptionGroup>;
  search: SearchResponse;
  pendingSearchIndexUpdates: Scalars['Int'];
  /** List Products */
  products: ProductList;
  /** Get a Product either by id or slug. If neither id nor slug is speicified, an error will result. */
  product?: Maybe<Product>;
  /** List ProductVariants either all or for the specific product. */
  productVariants: ProductVariantList;
  /** Get a ProductVariant by id */
  productVariant?: Maybe<ProductVariant>;
  promotion?: Maybe<Promotion>;
  promotions: PromotionList;
  promotionConditions: Array<ConfigurableOperationDefinition>;
  promotionActions: Array<ConfigurableOperationDefinition>;
  roles: RoleList;
  role?: Maybe<Role>;
  shippingMethods: ShippingMethodList;
  shippingMethod?: Maybe<ShippingMethod>;
  shippingEligibilityCheckers: Array<ConfigurableOperationDefinition>;
  shippingCalculators: Array<ConfigurableOperationDefinition>;
  fulfillmentHandlers: Array<ConfigurableOperationDefinition>;
  testShippingMethod: TestShippingMethodResult;
  testEligibleShippingMethods: Array<ShippingMethodQuote>;
  tag: Tag;
  tags: TagList;
  taxCategories: Array<TaxCategory>;
  taxCategory?: Maybe<TaxCategory>;
  taxRates: TaxRateList;
  taxRate?: Maybe<TaxRate>;
  zones: Array<Zone>;
  zone?: Maybe<Zone>;
  suppliers: SupplierList;
  supplier?: Maybe<Supplier>;
  supplierByChannel?: Maybe<Supplier>;
  vendorOrders: OrderList;
  getShoppingMallById?: Maybe<ShoppingMall>;
  getShoppingMalls: ShoppingMallList;
  globalCollections: CollectionList;
};


export type QueryadministratorsArgs = {
  options?: Maybe<AdministratorListOptions>;
};


export type QueryadministratorArgs = {
  id: Scalars['ID'];
};


export type QueryassetsArgs = {
  options?: Maybe<AssetListOptions>;
};


export type QueryassetArgs = {
  id: Scalars['ID'];
};


export type QuerychannelArgs = {
  id: Scalars['ID'];
};


export type QuerycollectionsArgs = {
  options?: Maybe<CollectionListOptions>;
};


export type QuerycollectionArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QuerycountriesArgs = {
  options?: Maybe<CountryListOptions>;
};


export type QuerycountryArgs = {
  id: Scalars['ID'];
};


export type QuerycustomerGroupsArgs = {
  options?: Maybe<CustomerGroupListOptions>;
};


export type QuerycustomerGroupArgs = {
  id: Scalars['ID'];
};


export type QuerycustomersArgs = {
  options?: Maybe<CustomerListOptions>;
};


export type QuerycustomerArgs = {
  id: Scalars['ID'];
};


export type QueryfacetsArgs = {
  options?: Maybe<FacetListOptions>;
};


export type QueryfacetArgs = {
  id: Scalars['ID'];
};


export type QueryjobArgs = {
  jobId: Scalars['ID'];
};


export type QueryjobsArgs = {
  options?: Maybe<JobListOptions>;
};


export type QueryjobsByIdArgs = {
  jobIds: Array<Scalars['ID']>;
};


export type QueryjobBufferSizeArgs = {
  bufferIds?: Maybe<Array<Scalars['String']>>;
};


export type QueryorderArgs = {
  id: Scalars['ID'];
};


export type QueryordersArgs = {
  options?: Maybe<OrderListOptions>;
};


export type QuerypaymentMethodsArgs = {
  options?: Maybe<PaymentMethodListOptions>;
};


export type QuerypaymentMethodArgs = {
  id: Scalars['ID'];
};


export type QueryproductOptionGroupsArgs = {
  filterTerm?: Maybe<Scalars['String']>;
};


export type QueryproductOptionGroupArgs = {
  id: Scalars['ID'];
};


export type QuerysearchArgs = {
  input: SearchInput;
};


export type QueryproductsArgs = {
  options?: Maybe<ProductListOptions>;
};


export type QueryproductArgs = {
  id?: Maybe<Scalars['ID']>;
  slug?: Maybe<Scalars['String']>;
};


export type QueryproductVariantsArgs = {
  options?: Maybe<ProductVariantListOptions>;
  productId?: Maybe<Scalars['ID']>;
};


export type QueryproductVariantArgs = {
  id: Scalars['ID'];
};


export type QuerypromotionArgs = {
  id: Scalars['ID'];
};


export type QuerypromotionsArgs = {
  options?: Maybe<PromotionListOptions>;
};


export type QueryrolesArgs = {
  options?: Maybe<RoleListOptions>;
};


export type QueryroleArgs = {
  id: Scalars['ID'];
};


export type QueryshippingMethodsArgs = {
  options?: Maybe<ShippingMethodListOptions>;
};


export type QueryshippingMethodArgs = {
  id: Scalars['ID'];
};


export type QuerytestShippingMethodArgs = {
  input: TestShippingMethodInput;
};


export type QuerytestEligibleShippingMethodsArgs = {
  input: TestEligibleShippingMethodsInput;
};


export type QuerytagArgs = {
  id: Scalars['ID'];
};


export type QuerytagsArgs = {
  options?: Maybe<TagListOptions>;
};


export type QuerytaxCategoryArgs = {
  id: Scalars['ID'];
};


export type QuerytaxRatesArgs = {
  options?: Maybe<TaxRateListOptions>;
};


export type QuerytaxRateArgs = {
  id: Scalars['ID'];
};


export type QueryzoneArgs = {
  id: Scalars['ID'];
};


export type QuerysuppliersArgs = {
  options?: Maybe<SupplierListOptions>;
};


export type QuerysupplierArgs = {
  id: Scalars['ID'];
};


export type QuerysupplierByChannelArgs = {
  channelId: Scalars['ID'];
};


export type QueryvendorOrdersArgs = {
  options?: Maybe<OrderListOptions>;
};


export type QuerygetShoppingMallByIdArgs = {
  id: Scalars['ID'];
};


export type QuerygetShoppingMallsArgs = {
  options?: Maybe<ShoppingMallListOptions>;
};


export type QueryglobalCollectionsArgs = {
  options?: Maybe<CollectionListOptions>;
};

export type RedeemInput = {
  customerId: Scalars['ID'];
  orderId?: Maybe<Scalars['ID']>;
  activity: AdminRewardRedumptionType;
  note?: Maybe<Scalars['String']>;
  rewards: Scalars['Int'];
};

export type Refund = Node & {
  __typename?: 'Refund';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  items: Scalars['Int'];
  shipping: Scalars['Int'];
  adjustment: Scalars['Int'];
  total: Scalars['Int'];
  method?: Maybe<Scalars['String']>;
  state: Scalars['String'];
  transactionId?: Maybe<Scalars['String']>;
  reason?: Maybe<Scalars['String']>;
  orderItems: Array<OrderItem>;
  paymentId: Scalars['ID'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type RefundOrderInput = {
  lines: Array<OrderLineInput>;
  shipping: Scalars['Int'];
  adjustment: Scalars['Int'];
  paymentId: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
};

export type RefundOrderResult = Refund | QuantityTooGreatError | NothingToRefundError | OrderStateTransitionError | MultipleOrderError | PaymentOrderMismatchError | RefundOrderStateError | AlreadyRefundedError | RefundStateTransitionError;

/** Returned if an attempting to refund an Order which is not in the expected state */
export type RefundOrderStateError = ErrorResult & {
  __typename?: 'RefundOrderStateError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  orderState: Scalars['String'];
};

/**
 * Returned when a call to modifyOrder fails to include a refundPaymentId even
 * though the price has decreased as a result of the changes.
 */
export type RefundPaymentIdMissingError = ErrorResult & {
  __typename?: 'RefundPaymentIdMissingError';
  errorCode: ErrorCode;
  message: Scalars['String'];
};

/** Returned when there is an error in transitioning the Refund state */
export type RefundStateTransitionError = ErrorResult & {
  __typename?: 'RefundStateTransitionError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  transitionError: Scalars['String'];
  fromState: Scalars['String'];
  toState: Scalars['String'];
};

export type RelationCustomFieldConfig = CustomField & {
  __typename?: 'RelationCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  entity: Scalars['String'];
  scalarFields: Array<Scalars['String']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type Release = Node & StockMovement & {
  __typename?: 'Release';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderItem: OrderItem;
};

export type RemoveOptionGroupFromProductResult = Product | ProductOptionInUseError;

export type RemoveProductVariantsFromChannelInput = {
  productVariantIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type RemoveProductsFromChannelInput = {
  productIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type RemovePromotionsFromChannelInput = {
  promotionIds: Array<Scalars['ID']>;
  channelId: Scalars['ID'];
};

export type Return = Node & StockMovement & {
  __typename?: 'Return';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderItem: OrderItem;
};

export type RewardAuditEntry = Node & {
  __typename?: 'RewardAuditEntry';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  customer: Customer;
  activity: Scalars['String'];
  order?: Maybe<Order>;
  rewards: Scalars['Int'];
  note?: Maybe<Scalars['String']>;
};

export type Role = Node & {
  __typename?: 'Role';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  description: Scalars['String'];
  permissions: Array<Permission>;
  channels: Array<Channel>;
};

export type RoleFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
};

export type RoleList = PaginatedList & {
  __typename?: 'RoleList';
  items: Array<Role>;
  totalItems: Scalars['Int'];
};

export type RoleListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<RoleSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<RoleFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type RoleSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
};

export type Sale = Node & StockMovement & {
  __typename?: 'Sale';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
  orderItem: OrderItem;
};

export type SearchInput = {
  term?: Maybe<Scalars['String']>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  facetValueOperator?: Maybe<LogicalOperator>;
  facetValueFilters?: Maybe<Array<FacetValueFilterInput>>;
  collectionId?: Maybe<Scalars['ID']>;
  collectionSlug?: Maybe<Scalars['String']>;
  groupByProduct?: Maybe<Scalars['Boolean']>;
  take?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  sort?: Maybe<SearchResultSortParameter>;
  priceRange?: Maybe<PriceRangeInput>;
  priceRangeWithTax?: Maybe<PriceRangeInput>;
  inStock?: Maybe<Scalars['Boolean']>;
};

export type SearchReindexResponse = {
  __typename?: 'SearchReindexResponse';
  success: Scalars['Boolean'];
};

export type SearchResponse = {
  __typename?: 'SearchResponse';
  items: Array<SearchResult>;
  totalItems: Scalars['Int'];
  facetValues: Array<FacetValueResult>;
  collections: Array<CollectionResult>;
  prices: SearchResponsePriceData;
};

export type SearchResponsePriceData = {
  __typename?: 'SearchResponsePriceData';
  range: PriceRange;
  rangeWithTax: PriceRange;
  buckets: Array<PriceRangeBucket>;
  bucketsWithTax: Array<PriceRangeBucket>;
};

export type SearchResult = {
  __typename?: 'SearchResult';
  enabled: Scalars['Boolean'];
  /** An array of ids of the Channels in which this result appears */
  channelIds: Array<Scalars['ID']>;
  sku: Scalars['String'];
  slug: Scalars['String'];
  productId: Scalars['ID'];
  productName: Scalars['String'];
  productAsset?: Maybe<SearchResultAsset>;
  productVariantId: Scalars['ID'];
  productVariantName: Scalars['String'];
  productVariantAsset?: Maybe<SearchResultAsset>;
  price: SearchResultPrice;
  priceWithTax: SearchResultPrice;
  currencyCode: CurrencyCode;
  description: Scalars['String'];
  facetIds: Array<Scalars['ID']>;
  facetValueIds: Array<Scalars['ID']>;
  /** An array of ids of the Collections in which this result appears */
  collectionIds: Array<Scalars['ID']>;
  /** A relevence score for the result. Differs between database implementations */
  score: Scalars['Float'];
  inStock?: Maybe<Scalars['Boolean']>;
};

export type SearchResultAsset = {
  __typename?: 'SearchResultAsset';
  id: Scalars['ID'];
  preview: Scalars['String'];
  focalPoint?: Maybe<Coordinate>;
};

/** The price of a search result product, either as a range or as a single price */
export type SearchResultPrice = PriceRange | SinglePrice;

export type SearchResultSortParameter = {
  name?: Maybe<SortOrder>;
  price?: Maybe<SortOrder>;
};

export type ServerConfig = {
  __typename?: 'ServerConfig';
  orderProcess: Array<OrderProcessState>;
  permittedAssetTypes: Array<Scalars['String']>;
  permissions: Array<PermissionDefinition>;
  customFieldConfig: CustomFields;
};

/** Returned if the Payment settlement fails */
export type SettlePaymentError = ErrorResult & {
  __typename?: 'SettlePaymentError';
  errorCode: ErrorCode;
  message: Scalars['String'];
  paymentErrorMessage: Scalars['String'];
};

export type SettlePaymentResult = Payment | SettlePaymentError | PaymentStateTransitionError | OrderStateTransitionError;

export type SettleRefundInput = {
  id: Scalars['ID'];
  transactionId: Scalars['String'];
};

export type SettleRefundResult = Refund | RefundStateTransitionError;

export type ShippingLine = {
  __typename?: 'ShippingLine';
  shippingMethod: ShippingMethod;
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  discountedPrice: Scalars['Int'];
  discountedPriceWithTax: Scalars['Int'];
  discounts: Array<Discount>;
};

export type ShippingMethod = Node & {
  __typename?: 'ShippingMethod';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  fulfillmentHandlerCode: Scalars['String'];
  checker: ConfigurableOperation;
  calculator: ConfigurableOperation;
  translations: Array<ShippingMethodTranslation>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  code?: Maybe<StringOperators>;
  name?: Maybe<StringOperators>;
  description?: Maybe<StringOperators>;
  fulfillmentHandlerCode?: Maybe<StringOperators>;
};

export type ShippingMethodList = PaginatedList & {
  __typename?: 'ShippingMethodList';
  items: Array<ShippingMethod>;
  totalItems: Scalars['Int'];
};

export type ShippingMethodListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<ShippingMethodSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<ShippingMethodFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type ShippingMethodQuote = {
  __typename?: 'ShippingMethodQuote';
  id: Scalars['ID'];
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  code: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  /** Any optional metadata returned by the ShippingCalculator in the ShippingCalculationResult */
  metadata?: Maybe<Scalars['JSON']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShippingMethodSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  code?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  description?: Maybe<SortOrder>;
  fulfillmentHandlerCode?: Maybe<SortOrder>;
};

export type ShippingMethodTranslation = {
  __typename?: 'ShippingMethodTranslation';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  languageCode: LanguageCode;
  name: Scalars['String'];
  description: Scalars['String'];
};

export type ShippingMethodTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type ShoppingMall = Node & {
  __typename?: 'ShoppingMall';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
  bannerImage?: Maybe<Asset>;
};

export type ShoppingMallFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  address?: Maybe<StringOperators>;
  city?: Maybe<StringOperators>;
  state?: Maybe<StringOperators>;
  postalCode?: Maybe<StringOperators>;
};

export type ShoppingMallInput = {
  name: Scalars['String'];
  address: Scalars['String'];
  city: Scalars['String'];
  state: Scalars['String'];
  postalCode: Scalars['String'];
};

export type ShoppingMallLinkInput = {
  mallId: Scalars['ID'];
  channelId: Scalars['ID'];
};

export type ShoppingMallList = PaginatedList & {
  __typename?: 'ShoppingMallList';
  items: Array<ShoppingMall>;
  totalItems: Scalars['Int'];
};

export type ShoppingMallListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<ShoppingMallSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<ShoppingMallFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type ShoppingMallSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  address?: Maybe<SortOrder>;
  city?: Maybe<SortOrder>;
  state?: Maybe<SortOrder>;
  postalCode?: Maybe<SortOrder>;
};

/** The price value where the result has a single price */
export type SinglePrice = {
  __typename?: 'SinglePrice';
  value: Scalars['Int'];
};

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type StockAdjustment = Node & StockMovement & {
  __typename?: 'StockAdjustment';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
};

export type StockMovement = {
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  productVariant: ProductVariant;
  type: StockMovementType;
  quantity: Scalars['Int'];
};

export type StockMovementItem = StockAdjustment | Allocation | Sale | Cancellation | Return | Release;

export type StockMovementList = {
  __typename?: 'StockMovementList';
  items: Array<StockMovementItem>;
  totalItems: Scalars['Int'];
};

export type StockMovementListOptions = {
  type?: Maybe<StockMovementType>;
  skip?: Maybe<Scalars['Int']>;
  take?: Maybe<Scalars['Int']>;
};

export enum StockMovementType {
  ADJUSTMENT = 'ADJUSTMENT',
  ALLOCATION = 'ALLOCATION',
  RELEASE = 'RELEASE',
  SALE = 'SALE',
  CANCELLATION = 'CANCELLATION',
  RETURN = 'RETURN'
}

export type StringCustomFieldConfig = CustomField & {
  __typename?: 'StringCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  length?: Maybe<Scalars['Int']>;
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  pattern?: Maybe<Scalars['String']>;
  options?: Maybe<Array<StringFieldOption>>;
  ui?: Maybe<Scalars['JSON']>;
};

export type StringFieldOption = {
  __typename?: 'StringFieldOption';
  value: Scalars['String'];
  label?: Maybe<Array<LocalizedString>>;
};

/** Operators for filtering on a String field */
export type StringOperators = {
  eq?: Maybe<Scalars['String']>;
  notEq?: Maybe<Scalars['String']>;
  contains?: Maybe<Scalars['String']>;
  notContains?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Scalars['String']>>;
  notIn?: Maybe<Array<Scalars['String']>>;
  regex?: Maybe<Scalars['String']>;
};

/** Indicates that an operation succeeded, where we do not want to return any more specific information. */
export type Success = {
  __typename?: 'Success';
  success: Scalars['Boolean'];
};

export type Supplier = Node & {
  __typename?: 'Supplier';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  storeName: Scalars['String'];
  contactPersonFullName: Scalars['String'];
  phoneNumber: Scalars['String'];
  emailAddress: Scalars['String'];
  gstNumber: Scalars['String'];
  panNumber: Scalars['String'];
  documentsPath: Scalars['String'];
  addresses: Array<SupplierAddress>;
  bankAccounts: Array<SupplierBankAccount>;
  channel: Channel;
};

export type SupplierAddress = Node & {
  __typename?: 'SupplierAddress';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode: Scalars['String'];
  country: Country;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
};

export type SupplierBankAccount = Node & {
  __typename?: 'SupplierBankAccount';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  accountHolderName: Scalars['String'];
  ifscCode: Scalars['String'];
  accountNumber: Scalars['String'];
  accountType: SupplierBankAccoutType;
};

export enum SupplierBankAccoutType {
  SAVINGS = 'SAVINGS',
  CURRENT = 'CURRENT'
}

export type SupplierFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  storeName?: Maybe<StringOperators>;
  contactPersonFullName?: Maybe<StringOperators>;
  phoneNumber?: Maybe<StringOperators>;
  emailAddress?: Maybe<StringOperators>;
  gstNumber?: Maybe<StringOperators>;
  panNumber?: Maybe<StringOperators>;
  documentsPath?: Maybe<StringOperators>;
};

export type SupplierList = PaginatedList & {
  __typename?: 'SupplierList';
  items: Array<Supplier>;
  totalItems: Scalars['Int'];
};

export type SupplierListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<SupplierSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<SupplierFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type SupplierSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  storeName?: Maybe<SortOrder>;
  contactPersonFullName?: Maybe<SortOrder>;
  phoneNumber?: Maybe<SortOrder>;
  emailAddress?: Maybe<SortOrder>;
  gstNumber?: Maybe<SortOrder>;
  panNumber?: Maybe<SortOrder>;
  documentsPath?: Maybe<SortOrder>;
};

export type Surcharge = Node & {
  __typename?: 'Surcharge';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  taxLines: Array<TaxLine>;
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  taxRate: Scalars['Float'];
};

export type SurchargeInput = {
  description: Scalars['String'];
  sku?: Maybe<Scalars['String']>;
  price: Scalars['Int'];
  priceIncludesTax: Scalars['Boolean'];
  taxRate?: Maybe<Scalars['Float']>;
  taxDescription?: Maybe<Scalars['String']>;
};

export type Tag = Node & {
  __typename?: 'Tag';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  value: Scalars['String'];
};

export type TagFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  value?: Maybe<StringOperators>;
};

export type TagList = PaginatedList & {
  __typename?: 'TagList';
  items: Array<Tag>;
  totalItems: Scalars['Int'];
};

export type TagListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<TagSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<TagFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type TagSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  value?: Maybe<SortOrder>;
};

export type TaxCategory = Node & {
  __typename?: 'TaxCategory';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  isDefault: Scalars['Boolean'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type TaxLine = {
  __typename?: 'TaxLine';
  description: Scalars['String'];
  taxRate: Scalars['Float'];
};

export type TaxRate = Node & {
  __typename?: 'TaxRate';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  enabled: Scalars['Boolean'];
  value: Scalars['Float'];
  category: TaxCategory;
  zone: Zone;
  customerGroup?: Maybe<CustomerGroup>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type TaxRateFilterParameter = {
  id?: Maybe<IDOperators>;
  createdAt?: Maybe<DateOperators>;
  updatedAt?: Maybe<DateOperators>;
  name?: Maybe<StringOperators>;
  enabled?: Maybe<BooleanOperators>;
  value?: Maybe<NumberOperators>;
};

export type TaxRateList = PaginatedList & {
  __typename?: 'TaxRateList';
  items: Array<TaxRate>;
  totalItems: Scalars['Int'];
};

export type TaxRateListOptions = {
  /** Skips the first n results, for use in pagination */
  skip?: Maybe<Scalars['Int']>;
  /** Takes n results, for use in pagination */
  take?: Maybe<Scalars['Int']>;
  /** Specifies which properties to sort the results by */
  sort?: Maybe<TaxRateSortParameter>;
  /** Allows the results to be filtered */
  filter?: Maybe<TaxRateFilterParameter>;
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: Maybe<LogicalOperator>;
};

export type TaxRateSortParameter = {
  id?: Maybe<SortOrder>;
  createdAt?: Maybe<SortOrder>;
  updatedAt?: Maybe<SortOrder>;
  name?: Maybe<SortOrder>;
  value?: Maybe<SortOrder>;
};

export type TestEligibleShippingMethodsInput = {
  shippingAddress: CreateAddressInput;
  lines: Array<TestShippingMethodOrderLineInput>;
};

export type TestShippingMethodInput = {
  checker: ConfigurableOperationInput;
  calculator: ConfigurableOperationInput;
  shippingAddress: CreateAddressInput;
  lines: Array<TestShippingMethodOrderLineInput>;
};

export type TestShippingMethodOrderLineInput = {
  productVariantId: Scalars['ID'];
  quantity: Scalars['Int'];
};

export type TestShippingMethodQuote = {
  __typename?: 'TestShippingMethodQuote';
  price: Scalars['Int'];
  priceWithTax: Scalars['Int'];
  metadata?: Maybe<Scalars['JSON']>;
};

export type TestShippingMethodResult = {
  __typename?: 'TestShippingMethodResult';
  eligible: Scalars['Boolean'];
  quote?: Maybe<TestShippingMethodQuote>;
};

export type TextCustomFieldConfig = CustomField & {
  __typename?: 'TextCustomFieldConfig';
  name: Scalars['String'];
  type: Scalars['String'];
  list: Scalars['Boolean'];
  label?: Maybe<Array<LocalizedString>>;
  description?: Maybe<Array<LocalizedString>>;
  readonly?: Maybe<Scalars['Boolean']>;
  internal?: Maybe<Scalars['Boolean']>;
  nullable?: Maybe<Scalars['Boolean']>;
  ui?: Maybe<Scalars['JSON']>;
};

export type TransitionFulfillmentToStateResult = Fulfillment | FulfillmentStateTransitionError;

export type TransitionOrderToStateResult = Order | OrderStateTransitionError;

export type TransitionPaymentToStateResult = Payment | PaymentStateTransitionError;

export type UpdateActiveAdministratorInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateAddressInput = {
  id: Scalars['ID'];
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  defaultShippingAddress?: Maybe<Scalars['Boolean']>;
  defaultBillingAddress?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateAdministratorInput = {
  id: Scalars['ID'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  roleIds?: Maybe<Array<Scalars['ID']>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateAssetInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  focalPoint?: Maybe<CoordinateInput>;
  tags?: Maybe<Array<Scalars['String']>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateChannelCustomFieldsInput = {
  address?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  bannerImageId?: Maybe<Scalars['ID']>;
  iconId?: Maybe<Scalars['ID']>;
  featuredMallId?: Maybe<Scalars['ID']>;
};

export type UpdateChannelInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['String']>;
  defaultLanguageCode?: Maybe<LanguageCode>;
  pricesIncludeTax?: Maybe<Scalars['Boolean']>;
  currencyCode?: Maybe<CurrencyCode>;
  defaultTaxZoneId?: Maybe<Scalars['ID']>;
  defaultShippingZoneId?: Maybe<Scalars['ID']>;
  customFields?: Maybe<UpdateChannelCustomFieldsInput>;
};

export type UpdateChannelResult = Channel | LanguageNotAvailableError;

export type UpdateCollectionInput = {
  id: Scalars['ID'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  filters?: Maybe<Array<ConfigurableOperationInput>>;
  translations?: Maybe<Array<UpdateCollectionTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCollectionTranslationInput = {
  id?: Maybe<Scalars['ID']>;
  languageCode: LanguageCode;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCountryInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<CountryTranslationInput>>;
  enabled?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCustomerCustomFieldsInput = {
  expo_token?: Maybe<Scalars['String']>;
};

export type UpdateCustomerGroupInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateCustomerInput = {
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  customFields?: Maybe<UpdateCustomerCustomFieldsInput>;
};

export type UpdateCustomerNoteInput = {
  noteId: Scalars['ID'];
  note: Scalars['String'];
};

export type UpdateCustomerResult = Customer | EmailAddressConflictError;

export type UpdateFacetInput = {
  id: Scalars['ID'];
  isPrivate?: Maybe<Scalars['Boolean']>;
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<FacetTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateFacetValueInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<FacetValueTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateGlobalSettingsCustomFieldsInput = {
  signupRewards?: Maybe<Scalars['Int']>;
  spinWheelRewards?: Maybe<Array<Scalars['Int']>>;
  numberOfSpinsLimit?: Maybe<Scalars['Int']>;
  numberOfSpinsLimitFrequency?: Maybe<Scalars['String']>;
  rewardTiers?: Maybe<Array<Scalars['String']>>;
  purchaseRewardsMutliplier?: Maybe<Scalars['Float']>;
  redeemRewardsMutliplier?: Maybe<Scalars['Float']>;
  minimumRewardsBalance?: Maybe<Scalars['Int']>;
};

export type UpdateGlobalSettingsInput = {
  availableLanguages?: Maybe<Array<LanguageCode>>;
  trackInventory?: Maybe<Scalars['Boolean']>;
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  customFields?: Maybe<UpdateGlobalSettingsCustomFieldsInput>;
};

export type UpdateGlobalSettingsResult = GlobalSettings | ChannelDefaultLanguageError;

export type UpdateOrderAddressInput = {
  fullName?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  streetLine1?: Maybe<Scalars['String']>;
  streetLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  id: Scalars['ID'];
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateOrderNoteInput = {
  noteId: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  isPublic?: Maybe<Scalars['Boolean']>;
};

export type UpdatePaymentMethodInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  checker?: Maybe<ConfigurableOperationInput>;
  handler?: Maybe<ConfigurableOperationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductCustomFieldsInput = {
  vendor?: Maybe<Scalars['String']>;
  country_of_origin?: Maybe<Scalars['String']>;
  manufacturer?: Maybe<Scalars['String']>;
};

export type UpdateProductInput = {
  id: Scalars['ID'];
  enabled?: Maybe<Scalars['Boolean']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  translations?: Maybe<Array<ProductTranslationInput>>;
  customFields?: Maybe<UpdateProductCustomFieldsInput>;
};

export type UpdateProductOptionGroupInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<ProductOptionGroupTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductOptionInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  translations?: Maybe<Array<ProductOptionGroupTranslationInput>>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateProductVariantCustomFieldsInput = {
  originalPriceWithTax?: Maybe<Scalars['Int']>;
  costPrice?: Maybe<Scalars['Int']>;
  dimension_length?: Maybe<Scalars['Float']>;
  dimension_length_unit?: Maybe<Scalars['String']>;
  dimension_breadth?: Maybe<Scalars['Float']>;
  dimension_breadth_unit?: Maybe<Scalars['String']>;
  dimension_height?: Maybe<Scalars['Float']>;
  dimension_height_unit?: Maybe<Scalars['String']>;
  dimension_weight?: Maybe<Scalars['Float']>;
  dimension_weight_unit?: Maybe<Scalars['String']>;
};

export type UpdateProductVariantInput = {
  id: Scalars['ID'];
  enabled?: Maybe<Scalars['Boolean']>;
  translations?: Maybe<Array<ProductVariantTranslationInput>>;
  facetValueIds?: Maybe<Array<Scalars['ID']>>;
  sku?: Maybe<Scalars['String']>;
  taxCategoryId?: Maybe<Scalars['ID']>;
  price?: Maybe<Scalars['Int']>;
  featuredAssetId?: Maybe<Scalars['ID']>;
  assetIds?: Maybe<Array<Scalars['ID']>>;
  stockOnHand?: Maybe<Scalars['Int']>;
  outOfStockThreshold?: Maybe<Scalars['Int']>;
  useGlobalOutOfStockThreshold?: Maybe<Scalars['Boolean']>;
  trackInventory?: Maybe<GlobalFlag>;
  customFields?: Maybe<UpdateProductVariantCustomFieldsInput>;
};

export type UpdatePromotionCustomFieldsInput = {
  isDefault?: Maybe<Scalars['Boolean']>;
  type?: Maybe<Scalars['String']>;
};

export type UpdatePromotionInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  enabled?: Maybe<Scalars['Boolean']>;
  startsAt?: Maybe<Scalars['DateTime']>;
  endsAt?: Maybe<Scalars['DateTime']>;
  couponCode?: Maybe<Scalars['String']>;
  perCustomerUsageLimit?: Maybe<Scalars['Int']>;
  conditions?: Maybe<Array<ConfigurableOperationInput>>;
  actions?: Maybe<Array<ConfigurableOperationInput>>;
  customFields?: Maybe<UpdatePromotionCustomFieldsInput>;
};

export type UpdatePromotionResult = Promotion | MissingConditionsError;

export type UpdateRoleInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  channelIds?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateShippingMethodInput = {
  id: Scalars['ID'];
  code?: Maybe<Scalars['String']>;
  fulfillmentHandler?: Maybe<Scalars['String']>;
  checker?: Maybe<ConfigurableOperationInput>;
  calculator?: Maybe<ConfigurableOperationInput>;
  translations: Array<ShippingMethodTranslationInput>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateSupplierAddressInput = {
  id: Scalars['ID'];
  fullName: Scalars['String'];
  company?: Maybe<Scalars['String']>;
  streetLine1: Scalars['String'];
  streetLine2: Scalars['String'];
  city: Scalars['String'];
  province: Scalars['String'];
  postalCode: Scalars['String'];
  countryCode: Scalars['String'];
  phoneNumber: Scalars['String'];
  defaultShippingAddress: Scalars['Boolean'];
  defaultBillingAddress: Scalars['Boolean'];
};

export type UpdateSupplierBankAccountInput = {
  id: Scalars['ID'];
  accountHolderName: Scalars['String'];
  ifscCode: Scalars['String'];
  accountNumber: Scalars['String'];
  accountType: SupplierBankAccoutType;
};

export type UpdateSupplierInput = {
  id: Scalars['ID'];
  storeName?: Maybe<Scalars['String']>;
  contactPersonFullName?: Maybe<Scalars['String']>;
  phoneNumber?: Maybe<Scalars['String']>;
  emailAddress?: Maybe<Scalars['String']>;
  gstNumber?: Maybe<Scalars['String']>;
  panNumber?: Maybe<Scalars['String']>;
  documentsPath?: Maybe<Scalars['String']>;
};

export type UpdateTagInput = {
  id: Scalars['ID'];
  value?: Maybe<Scalars['String']>;
};

export type UpdateTaxCategoryInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  isDefault?: Maybe<Scalars['Boolean']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateTaxRateInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['Float']>;
  enabled?: Maybe<Scalars['Boolean']>;
  categoryId?: Maybe<Scalars['ID']>;
  zoneId?: Maybe<Scalars['ID']>;
  customerGroupId?: Maybe<Scalars['ID']>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type UpdateZoneInput = {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  customFields?: Maybe<Scalars['JSON']>;
};


export type User = Node & {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  identifier: Scalars['String'];
  verified: Scalars['Boolean'];
  roles: Array<Role>;
  lastLogin?: Maybe<Scalars['DateTime']>;
  authenticationMethods: Array<AuthenticationMethod>;
  customFields?: Maybe<Scalars['JSON']>;
};

export type Zone = Node & {
  __typename?: 'Zone';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  members: Array<Country>;
  customFields?: Maybe<Scalars['JSON']>;
};
