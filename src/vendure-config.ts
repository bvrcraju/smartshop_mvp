import {
  DefaultAssetNamingStrategy,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  VendureConfig,
} from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import {
  AssetServerOptions,
  AssetServerPlugin,
  configureS3AssetStorage,
} from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import path from "path";
import * as dotenv from "dotenv";
import fs from "fs";
import { customAdminUi } from "./compile-admin-ui";
import { ElasticsearchPlugin } from "@vendure/elasticsearch-plugin";
import { RewardsPlugin } from "./plugins/rewards/rewards-plugin";
import { FirebaseAuthPlugin } from "./plugins/firebase-auth/firebase-auth-plugin";
import { ProductExtentionPlugin } from "./plugins/product-extention/product-extention-plugin";
import { ProductVarientExtentionPlugin } from "./plugins/product-varient-extention/product-varient-extention-plugin";
import { OrderExtentionPlugin } from "./plugins/order-extention/orders-extension-plugin";
import { PayUPlugin } from "./plugins/payu";
import { ShoppingMallPlugin } from "./plugins/shopping-mall/shopping-mall-plugin";
import { ExpoPushNotificationsPlugin } from "./plugins/expo-push-notifications/expo-push-notifications-plugin";
import { CollectionsExtensionPlugin } from "./plugins/collections-extention/collections-extension-plugin";
import { SupplierPlugin } from "./plugins/supplier/supplier-plugin";

const IS_PROD = path.basename(__dirname) === "dist";

dotenv.config({ path: "./.env" });

const localStorageStrategyConfig: AssetServerOptions = {
  route: "assets",
  assetUploadDir: path.join(__dirname, "../static/assets"),
};
const s3StorageStrategyConfig: AssetServerOptions = {
  route: "assets",
  assetUploadDir: path.join(__dirname, "../static/assets"),
  namingStrategy: new DefaultAssetNamingStrategy(),
  storageStrategyFactory: configureS3AssetStorage({
    bucket: process.env.AWS_BUCKET || "",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  }),
};

export const config: VendureConfig = {
  apiOptions: {
    port: Number(process.env.PORT) || 3000,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    adminApiPlayground: {
      settings: { "request.credentials": "include" },
    },
    adminApiDebug: true,
    shopApiPlayground: {
      settings: { "request.credentials": "include" },
    },
    shopApiDebug: true,
  },
  authOptions: {
    superadminCredentials: {
      identifier: "superadmin",
      password: "superadmin",
    },
    tokenMethod: "bearer",
    requireVerification: false,
  },
  dbConnectionOptions: {
    url: process.env.DATABASE_URL,
    type: "postgres",
    synchronize: false, // turn this off for production
    logging: false,
    migrations: [getMigrationsPath()],
    ssl:
      process.env.DATABASE_SSL === "on" ? { rejectUnauthorized: false } : false,
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  plugins: [
    AssetServerPlugin.init(
      process.env.ASSET_SERVER_STRATEGY === "s3"
        ? s3StorageStrategyConfig
        : localStorageStrategyConfig
    ),
    process.env.INDEXING_STRETEGY === "elasticsearch"
      ? ElasticsearchPlugin.init({
          host: process.env.ELASTICSEARCH_HOST || "localhost",
          port: Number(process.env.ELASTICSEARCH_PORT) || 9200,
          clientOptions: {
            cloud: { id: process.env.ELASTICSEARCH_CLOUD_ID || "" },
            auth: { apiKey: process.env.ELASTICSEARCH_API_KEY || "" },
          },
          indexPrefix: process.env.ELASTICSEARCH_INDEX_PREFIX || "",
        })
      : DefaultSearchPlugin.init({
          bufferUpdates: false,
          indexStockStatus: true,
        }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    EmailPlugin.init({
      route: "mailbox",
      devMode: true,
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../static/email/templates"),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: "http://localhost:8080/verify",
        passwordResetUrl: "http://localhost:8080/password-reset",
        changeEmailAddressUrl:
          "http://localhost:8080/verify-email-address-change",
      },
    }),
    // AdminUiPlugin.init({
    //   route: "admin",
    //   port: 3002,
    //   app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
    // }),
    AdminUiPlugin.init({
      route: "admin",
      port: Number(process.env.PORT) || 3000,
      app: customAdminUi({ recompile: !IS_PROD, devMode: !IS_PROD }),
      adminUiConfig: {
        brand: "SmartShop Admin",
        hideVendureBranding: true,
        hideVersion: true,
        apiHost: "auto",
        apiPort: "auto",
      },
    }),
    SupplierPlugin,
    RewardsPlugin,
    FirebaseAuthPlugin,
    ProductExtentionPlugin,
    ProductVarientExtentionPlugin,
    OrderExtentionPlugin,
    PayUPlugin.init({ host: process.env.HOST as string }),
    ShoppingMallPlugin,
    ExpoPushNotificationsPlugin,
    CollectionsExtensionPlugin
  ],
};

function getMigrationsPath() {
  const devMigrationsPath = path.join(__dirname, "../migrations");
  const distMigrationsPath = path.join(__dirname, "migrations");

  return fs.existsSync(distMigrationsPath)
    ? path.join(distMigrationsPath, "*.js")
    : path.join(devMigrationsPath, "*.ts");
}
