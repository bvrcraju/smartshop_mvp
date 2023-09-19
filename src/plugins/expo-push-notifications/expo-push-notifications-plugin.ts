import {
  CustomerEvent,
  EventBus,
  GlobalSettingsService,
  OrderStateTransitionEvent,
  PluginCommonModule,
  VendurePlugin,
} from "@vendure/core";
import { OnApplicationBootstrap } from "@nestjs/common";
import { filter } from "rxjs/operators";

@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    config.customFields.Customer.push({
      name: "expo_token",
      type: "string",
    });
    return config;
  },
})
export class ExpoPushNotificationsPlugin implements OnApplicationBootstrap {
  constructor(
    private eventBus: EventBus,
  ) {}
  async onApplicationBootstrap() {
  }
}