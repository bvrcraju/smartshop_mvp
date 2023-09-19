import { gql } from 'apollo-server-core';

export const adminApiExtensions = gql`

    type Supplier implements Node{
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        storeName: String!
        contactPersonFullName: String!
        phoneNumber: String!
        emailAddress: String!
        gstNumber: String!
        panNumber: String!
        documentsPath: String!
        addresses: [SupplierAddress!]!
        bankAccounts: [SupplierBankAccount!]!
        channel: Channel!
    }

    type SupplierBankAccount implements Node{
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        accountHolderName: String!
        ifscCode: String!
        accountNumber: String!
        accountType: SupplierBankAccoutType!
    }

    enum SupplierBankAccoutType{
        SAVINGS
        CURRENT
    }

    type SupplierAddress implements Node{
        id: ID!
        createdAt: DateTime!
        updatedAt: DateTime!
        fullName: String
        company: String
        streetLine1: String!
        streetLine2: String
        city: String
        province: String
        postalCode: String!
        country: Country!
        phoneNumber: String
        defaultShippingAddress: Boolean
        defaultBillingAddress: Boolean
    }

    input CreateSupplierInput{
        storeName: String!
        contactPersonFullName: String!
        phoneNumber: String!
        emailAddress: String!
        password: String!
        gstNumber: String!
        panNumber: String!
        documentsPath: String!
        addresses: [CreateSupplierAddressInput!]!
        bankAccounts: [CreateSupplierBankAccountInput!]!
    }

    input UpdateSupplierInput{
        id: ID!
        storeName: String
        contactPersonFullName: String
        phoneNumber: String
        emailAddress: String
        gstNumber: String
        panNumber: String
        documentsPath: String
    }

    input CreateSupplierAddressInput{
        fullName: String
        company: String
        streetLine1: String!
        streetLine2: String
        city: String
        province: String
        postalCode: String
        countryCode: String!
        phoneNumber: String!
        defaultShippingAddress: Boolean
        defaultBillingAddress: Boolean
    }

    input UpdateSupplierAddressInput{
        id: ID!
        fullName: String!
        company: String
        streetLine1: String!
        streetLine2: String!
        city: String!
        province: String!
        postalCode: String!
        countryCode: String!
        phoneNumber: String!
        defaultShippingAddress: Boolean!
        defaultBillingAddress: Boolean!
    }

    input CreateSupplierBankAccountInput{
        accountHolderName: String!
        ifscCode: String!
        accountNumber: String!
        accountType: SupplierBankAccoutType!
    }

    input UpdateSupplierBankAccountInput{
        id: ID!
        accountHolderName: String!
        ifscCode: String!
        accountNumber: String!
        accountType: SupplierBankAccoutType!
    }

    type SupplierList implements PaginatedList {
        items: [Supplier!]!
        totalItems: Int!
    }

    union CreateSupplierResult = Supplier | LanguageNotAvailableError

    extend type Query{
        suppliers: SupplierList!
        supplier(id: ID!): Supplier
        supplierByChannel(channelId: ID!): Supplier
    }

    extend type Mutation{
        registerSupplierAccount(input: CreateSupplierInput!): CreateSupplierResult!
        updateSupplier(input: UpdateSupplierInput!): Supplier
        createSupplierAddress(input: CreateSupplierAddressInput!): SupplierAddress
        updateSupplierAddress(input: UpdateSupplierAddressInput!): SupplierAddress!
        createSupplierBankAccount(input: CreateSupplierBankAccountInput!): SupplierBankAccount
        updateSupplierBankAccount(input: UpdateSupplierBankAccountInput!): SupplierBankAccount
    }
`;