import { ShoppingMall } from "./entities/shopping-mall.entity";

declare module '@vendure/core' {
    interface CustomChannelFields {
        featuredMall: ShoppingMall;        
    }
}