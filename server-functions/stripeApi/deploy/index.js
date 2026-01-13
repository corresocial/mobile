"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const stripe_1 = require("stripe");
if (!admin.apps.length)
    admin.initializeApp();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing. Stripe functionality will fail until it is set.');
}
const stripe = new stripe_1.Stripe(stripeSecretKey || 'sk_test_placeholder', {
    apiVersion: '2025-12-15.clover',
});
const getCustomerId = (uid) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('getCustomerId', uid);
    const userDoc = yield admin.firestore().collection('users').doc(uid).get();
    return (_a = userDoc.data()) === null || _a === void 0 ? void 0 : _a.stripeCustomerId;
});
exports.stripeApi = (0, https_1.onCall)({ region: 'southamerica-east1' }, (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!request.auth)
        throw new https_1.HttpsError('unauthenticated', 'User must be logged in');
    const { uid, token } = request.auth;
    const _c = request.data, { action } = _c, data = __rest(_c, ["action"]);
    const email = token.email || '';
    const name = token.name || '';
    try {
        switch (action) {
            case 'create-customer': {
                let customerId = yield getCustomerId(uid);
                if (!customerId) {
                    const customer = yield stripe.customers.create({
                        email, name, metadata: { firebaseUID: uid }
                    });
                    customerId = customer.id;
                    yield admin.firestore().collection('users').doc(uid).set({ stripeCustomerId: customerId }, { merge: true });
                }
                return { customerId };
            }
            case 'update-customer': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    throw new https_1.HttpsError('not-found', 'Customer not found');
                return yield stripe.customers.update(customerId, data);
            }
            case 'payment-methods': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    return { data: [] };
                return yield stripe.paymentMethods.list({ customer: customerId, type: 'card' });
            }
            case 'attach-payment-method': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    throw new https_1.HttpsError('not-found', 'Customer not found');
                return yield stripe.paymentMethods.attach(data.paymentMethodId, { customer: customerId });
            }
            case 'set-default-payment-method': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    throw new https_1.HttpsError('not-found', 'Customer not found');
                return yield stripe.customers.update(customerId, {
                    invoice_settings: { default_payment_method: data.paymentMethodId },
                });
            }
            case 'subscriptions': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    return { data: [] };
                const res = yield stripe.subscriptions.list({
                    customer: customerId,
                    status: data.status || 'active',
                });
                return res;
            }
            case 'create-subscription': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    throw new https_1.HttpsError('not-found', 'Customer not found');
                const trialEndDate = Math.round((Date.now() / 1000)) + 31650000;
                const freeTrialParams = data.freeTrial ? { trial_end: trialEndDate } : {};
                const subscription = yield stripe.subscriptions.create(Object.assign(Object.assign({ customer: customerId, items: [{ price: data.priceId }] }, freeTrialParams), { payment_behavior: 'allow_incomplete', payment_settings: { save_default_payment_method: 'on_subscription' }, expand: ['latest_invoice.payment_intent'] }));
                console.log('sub', JSON.stringify(subscription));
                return {
                    subscriptionId: subscription.id,
                    clientSecret: (_b = (_a = subscription.latest_invoice) === null || _a === void 0 ? void 0 : _a.payment_intent) === null || _b === void 0 ? void 0 : _b.client_secret,
                };
            }
            case 'update-subscription': {
                console.log('update-subscription', data.subscriptionId, data.priceId);
                const sub = yield stripe.subscriptions.retrieve(data.subscriptionId);
                if (!sub)
                    throw new https_1.HttpsError('not-found', 'Subscription not found');
                console.log('sub-to-update', JSON.stringify(sub));
                const updatedSub = yield stripe.subscriptions.update(data.subscriptionId, {
                    proration_behavior: 'always_invoice',
                    cancel_at_period_end: false,
                    proration_date: Math.floor((Date.now()) / 1000),
                    items: [{ id: sub.items.data[0].id, price: data.priceId }],
                });
                console.log('updated-sub', JSON.stringify(updatedSub));
                return updatedSub;
            }
            case 'cancel-subscription': {
                return yield stripe.subscriptions.cancel(data.subscriptionId);
            }
            case 'refund-last-payment': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    throw new https_1.HttpsError('not-found', 'Customer not found');
                const paymentIntents = yield stripe.paymentIntents.list({
                    customer: customerId,
                    limit: 10, // Fetch a few to find the latest succeeded one
                });
                const successfulPI = paymentIntents.data.find(pi => pi.status === 'succeeded' && pi.amount > 1);
                if (!successfulPI)
                    throw new https_1.HttpsError('not-found', 'No successful payment found');
                return yield stripe.refunds.create({ payment_intent: successfulPI.id });
            }
            case 'send-receipt': {
                const customerId = yield getCustomerId(uid);
                if (!customerId)
                    throw new https_1.HttpsError('not-found', 'Customer not found');
                const charges = yield stripe.charges.list({
                    customer: customerId,
                    limit: 1,
                });
                if (charges.data.length === 0)
                    throw new https_1.HttpsError('not-found', 'No charge found');
                const updatedCharge = yield stripe.charges.update(charges.data[0].id, { receipt_email: data.email });
                return { receipt_email: updatedCharge.receipt_email, receipt_url: charges.data[0].receipt_url };
            }
            case 'products': {
                return yield stripe.products.list({ expand: ['data.default_price'], active: true });
            }
            default:
                throw new https_1.HttpsError('invalid-argument', `Unknown action: ${action}`);
        }
    }
    catch (error) {
        console.error(`Error in action ${action}:`, error);
        throw new https_1.HttpsError('internal', error.message);
    }
}));
const webhookApp = (0, express_1.default)();
webhookApp.post('/', express_1.default.raw({ type: 'application/json' }), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        if (!sig || !endpointSecret)
            throw new Error('Missing signature or secret');
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    }
    catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    if (event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        const usersSnapshot = yield admin.firestore().collection('users')
            .where('stripeCustomerId', '==', customerId).get();
        if (!usersSnapshot.empty) {
            const userDoc = usersSnapshot.docs[0];
            yield userDoc.ref.update({
                'subscription.status': 'active',
                'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp()
            });
        }
    }
    res.json({ received: true });
}));
exports.stripeWebhook = (0, https_1.onRequest)({ region: 'southamerica-east1' }, webhookApp);
