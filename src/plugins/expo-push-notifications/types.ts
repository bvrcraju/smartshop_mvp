import {} from "@vendure/core";

declare module '@vendure/core' {
    interface CustomCustomerFields {
        expo_token: string;
    }
}