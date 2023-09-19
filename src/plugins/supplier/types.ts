import { Asset } from "@vendure/core";

declare module '@vendure/core' {
    interface CustomChannelFields {
        address: string;
        note: string;
        icon: Asset;
        bannerImage: Asset;
    }
}