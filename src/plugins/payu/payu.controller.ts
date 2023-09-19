// import createMollieClient, { PaymentStatus } from '@mollie/api-client';
import {Body, Controller, Param, Post, Get, Req, Render } from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';
import {
    ChannelService,
    LanguageCode,
    Logger,
    OrderService,
    Payment,
    PaymentMethodService,
    RequestContext,
    TransactionalConnection,
} from '@vendure/core';

import { loggerCtx } from './constants';

@Controller('payments')
export class PayuController {
    constructor(
        private orderService: OrderService,
        private connection: TransactionalConnection,
        private paymentMethodService: PaymentMethodService,
        private channelService: ChannelService,
    ) {}

    @Get('payu/checkout/:orderCode/:channelToken/:paymentMethodId')
    @Render('payu/index.hbs')
    async root(
        @Param('orderCode') orderCode: string,
        @Param('channelToken') channelToken: string,
        @Param('paymentMethodId') paymentMethodId: string,
        @Req() req: Request,
        @Body() body: any,
    ){
        Logger.info(`url = ${req.url}`, loggerCtx);
        const ctx = await this.createContext(channelToken);
        const redirectUrl = `${req.protocol}://${req.get('host')}/payments/payu/checkout/${orderCode}/${channelToken}/${paymentMethodId}`;
        Logger.info(`redirectUrl = ${redirectUrl}`, loggerCtx);
        Logger.info(`Received payment for ${channelToken}`, loggerCtx);
        const paymentMethod = await this.paymentMethodService.findOne(ctx, paymentMethodId);
        if (!paymentMethod) {
            // Fail silently, as we don't want to expose if a paymentMethodId exists or not
            return Logger.error(`No paymentMethod found with id ${paymentMethod}`, loggerCtx);
        }
        const gateWayUrl = paymentMethod.handler.args.find(a => a.name === 'gateWayUrl')?.value;
        const merchantKey = paymentMethod.handler.args.find(a => a.name === 'merchantKey')?.value;
        const merchantSalt = paymentMethod.handler.args.find(a => a.name === 'merchantSalt')?.value;
        
        if (!gateWayUrl || !merchantKey || !merchantSalt) {
            throw Error(`No apiKey found for payment ${paymentMethod.id} for channel ${channelToken}`);
        }
        const order = await this.orderService.findOneByCode(ctx, orderCode);
        if (!order) {
            throw Error(`No order found for ${orderCode}`);
        }

        let productInfo = '';
        order.lines.forEach(line => {
            productInfo += `PV${line.productVariant.id}xQ${line.quantity},`;
        });

        // Logger.info(`productInfo = ${productInfo}`, loggerCtx);
        // Logger.info(`order = ${JSON.stringify(order)}`, loggerCtx);
        let cryp = crypto.createHash('sha512');
		let text = merchantKey+'|'+order?.code+'|'+(order?.totalWithTax/100).toFixed(2)+'|'+productInfo+'|'+order.customer?.firstName+'|'+order.customer?.emailAddress+'|||||||||||'+merchantSalt;
		cryp.update(text);
		let hash = cryp.digest('hex');	

        return {totalOrderAmount:(order.totalWithTax / 100).toFixed(2) ,merchantKey, order, hash, gateWayUrl, productInfo, redirectUrl, message: 'Redirecting to Payment Gateway' };
        //const ctx = await this.createContext(channelToken);
    }

    @Post('payu/checkout/:orderCode/:channelToken/:paymentMethodId')
    @Render('payu/status.hbs')
    async webhook(
        @Param('orderCode') orderCode: string,
        @Param('channelToken') channelToken: string,
        @Param('paymentMethodId') paymentMethodId: string,
        @Req() req: Request,
        @Body() body: any,
    ){
        Logger.info(`url = ${req.url}`, loggerCtx);
        const ctx = await this.createContext(channelToken);
        const order = await this.orderService.findOneByCode(ctx, orderCode);
        if (!order) {
            throw Error(`No order found for ${orderCode}`);
        }
        const paymentMethod = await this.paymentMethodService.findOne(ctx, paymentMethodId);
        if (!paymentMethod) {
            // Fail silently, as we don't want to expose if a paymentMethodId exists or not
            return Logger.error(`No paymentMethod found with id ${paymentMethod}`, loggerCtx);
        }
        const gateWayUrl = paymentMethod.handler.args.find(a => a.name === 'gateWayUrl')?.value;
        const merchantKey = paymentMethod.handler.args.find(a => a.name === 'merchantKey')?.value;
        const merchantSalt = paymentMethod.handler.args.find(a => a.name === 'merchantSalt')?.value;
        
        if (!gateWayUrl || !merchantKey || !merchantSalt) {
            throw Error(`No apiKey found for payment ${paymentMethod.id} for channel ${channelToken}`);
        }

        // Logger.info(`${JSON.stringify(body)}`, loggerCtx);
        var txnid = body.txnid;
        var amount = body.amount;
        var productinfo = body.productinfo;
        var firstname = body.firstname;
        var email = body.email;
        var mihpayid = body.mihpayid;
        var status = body.status;
        var resphash = body.hash;
        var additionalcharges = "";
        //Calculate response hash to verify	
        var keyString 		=  	merchantKey+'|'+txnid+'|'+amount+'|'+productinfo+'|'+firstname+'|'+email+'||||||||||';
        var keyArray 		= 	keyString.split('|');
        var reverseKeyArray	= 	keyArray.reverse();
        var reverseKeyString=	merchantSalt+'|'+status+'|'+reverseKeyArray.join('|');

        if(typeof body.additionalCharges !== "undefined"){
            additionalcharges = body.additionalCharges;
            reverseKeyString = additionalcharges+'|'+reverseKeyString;
        }

        var cryp = crypto.createHash('sha512');	
	    cryp.update(reverseKeyString);
	    var calchash = cryp.digest('hex');


        if (calchash == resphash && status === 'success') {
            const dbPayment = await this.connection
            .getRepository(Payment)
            .findOneOrFail({ where: { transactionId: txnid } });

            await this.orderService.settlePayment(ctx, dbPayment.id);
            await this.connection
            .getRepository(Payment).update({ id: dbPayment.id}, {transactionId: mihpayid});
            Logger.info(`Payment for order ${txnid} settled`, loggerCtx);
            return { status:"success", message: 'Payment Successful' };
        } else {
            Logger.warn(
                `Received payment for order ${txnid} with status ${status}`,
                loggerCtx,
            );
            return { status:"fail", message: 'Payment Failed' };
        }

    }
    private async createContext(channelToken: string): Promise<RequestContext> {
        const channel = await this.channelService.getChannelFromToken(channelToken);
        return new RequestContext({
            apiType: 'admin',
            isAuthorized: true,
            authorizedAsOwnerOnly: false,
            channel,
            languageCode: LanguageCode.en,
        });
    }
}
