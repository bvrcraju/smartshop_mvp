import { PluginCommonModule, RuntimeVendureConfig, VendurePlugin } from '@vendure/core';
import { FirebaseAuthenticationStrategy } from './firebase-authentication-strategy';
import { ExternalFirebaseAuthenticationService } from './helper/external-firebase-authentication.service';
import { RewardsService } from '../rewards/api/rewards.service';
@VendurePlugin({
    imports: [PluginCommonModule],
    providers: [ExternalFirebaseAuthenticationService, RewardsService],
    configuration: (config: RuntimeVendureConfig) => {
        config.authOptions.shopAuthenticationStrategy = [
            ...config.authOptions.shopAuthenticationStrategy,
            new FirebaseAuthenticationStrategy(),
        ];
        return config;
    },
})
export class FirebaseAuthPlugin {}