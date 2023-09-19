import {
    AuthenticationStrategy,
    Injector,
    RequestContext,
    User,
} from '@vendure/core';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';
import { decode } from "js-base64";
import * as admin from "firebase-admin";
import { App } from 'firebase-admin/app';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { ExternalFirebaseAuthenticationService } from './helper/external-firebase-authentication.service';

export type FirebaseAuthData = {
    token: string;
    phoneNumber: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
};

export class FirebaseAuthenticationStrategy implements AuthenticationStrategy<FirebaseAuthData> {
    readonly name = 'firebase';
    private firebaseAdminApp: App;
    private externalAuthenticationService: ExternalFirebaseAuthenticationService;

    constructor() {
        let cert_token = process.env.FIREBASE_SERVICE_ACCOUNT_JSON_BASE64 as string;
        this.firebaseAdminApp = admin.initializeApp({
            credential: admin.credential.cert(JSON.parse(decode(cert_token))),
        });
    }

    init(injector: Injector) {
        this.externalAuthenticationService = injector.get(ExternalFirebaseAuthenticationService);
    }

    defineInputType(): DocumentNode {
        return gql`
            input FirebaseAuthInput {
                token: String!,
                phoneNumber: String!,
                emailAddress: String,
                firstName: String,
                lastName: String,
            }
        `;
    }

    async authenticate(ctx: RequestContext, data: FirebaseAuthData): Promise<User | false> {
        try {
            const ticket:DecodedIdToken = await admin.auth().verifyIdToken(data.token);
            // let ticket:{email:string, phone_number:string} = {
            //     email: data.emailAddress,
            //     phone_number: data.phoneNumber,
            // }
            if(!ticket || !ticket.phone_number || (ticket.phone_number !== data.phoneNumber)) {
                return false;
            }
    
            const user = await this.externalAuthenticationService.findCustomerUser(ctx, this.name, ticket.phone_number as string);
            // const user = await this.externalAuthenticationService.findCustomerUser(ctx, this.name, data.phoneNumber);
    
            if (user) {
                return user;
            }
            return this.externalAuthenticationService.createCustomerAndUser(ctx, {
                strategy: this.name,
                externalIdentifier: ticket.phone_number as string,
                verified: true,
                emailAddress: ticket.email as string || data.emailAddress as string || '',
                firstName: data.firstName as string || '',
                lastName: data.lastName as string || '',
                phoneNumber: ticket.phone_number as string,
            });            
        } catch (error) {
            return false;
        }
    }
}
