import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import { Stripe } from 'stripe';

if (!admin.apps.length) admin.initializeApp();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-11-17.clover',
});

const getCustomerId = async (uid: string) => {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    return userDoc.data()?.stripeCustomerId;
};

exports.stripeApi = onCall({ region: 'southamerica-east1' }, async (request) => {
    if (!request.auth) throw new HttpsError('unauthenticated', 'User must be logged in');

    const { uid, token } = request.auth;
    const { action, ...data } = request.data;
    const email = token.email || '';
    const name = token.name || '';

    try {
        switch (action) {
            case 'create-customer': {
                let customerId = await getCustomerId(uid);
                if (!customerId) {
                    const customer = await stripe.customers.create({
                        email, name, metadata: { firebaseUID: uid }
                    });
                    customerId = customer.id;
                    await admin.firestore().collection('users').doc(uid).set(
                        { stripeCustomerId: customerId }, { merge: true }
                    );
                }
                return { customerId };
            }
            case 'update-customer': {
                const customerId = await getCustomerId(uid);
                if (!customerId) throw new HttpsError('not-found', 'Customer not found');
                return await stripe.customers.update(customerId, data);
            }
            case 'payment-methods': {
                const customerId = await getCustomerId(uid);
                if (!customerId) return { data: [] };
                return await stripe.paymentMethods.list({ customer: customerId, type: 'card' });
            }
            case 'attach-payment-method': {
                const customerId = await getCustomerId(uid);
                if (!customerId) throw new HttpsError('not-found', 'Customer not found');
                return await stripe.paymentMethods.attach(data.paymentMethodId, { customer: customerId });
            }
            case 'set-default-payment-method': {
                const customerId = await getCustomerId(uid);
                if (!customerId) throw new HttpsError('not-found', 'Customer not found');
                return await stripe.customers.update(customerId, {
                    invoice_settings: { default_payment_method: data.paymentMethodId },
                });
            }
            case 'subscriptions': {
                const customerId = await getCustomerId(uid);
                if (!customerId) return { data: [] };
                return await stripe.subscriptions.list({
                    customer: customerId,
                    status: data.status || 'active',
                });
            }
            case 'create-subscription': {
                const customerId = await getCustomerId(uid);
                if (!customerId) throw new HttpsError('not-found', 'Customer not found');
                const trialEndDate = Math.round((Date.now() / 1000)) + 31650000;
                const freeTrialParams = data.freeTrial ? { trial_end: trialEndDate } : {};
                const subscription = await stripe.subscriptions.create({
                    customer: customerId,
                    items: [{ price: data.priceId }],
                    ...freeTrialParams,
                    payment_behavior: 'default_incomplete',
                    payment_settings: { save_default_payment_method: 'on_subscription' },
                    expand: ['latest_invoice.payment_intent'],
                });
                return {
                    subscriptionId: subscription.id,
                    clientSecret: (subscription.latest_invoice as any).payment_intent.client_secret,
                };
            }
            case 'update-subscription': {
                const sub = await stripe.subscriptions.retrieve(data.subscriptionId);
                if (!sub) throw new HttpsError('not-found', 'Subscription not found');
                return await stripe.subscriptions.update(data.subscriptionId, {
                    proration_behavior: 'always_invoice',
                    cancel_at_period_end: false,
                    proration_date: Math.floor((Date.now()) / 1000),
                    items: [{ id: sub.items.data[0].id, price: data.priceId }],
                });
            }
            case 'cancel-subscription': {
                return await stripe.subscriptions.cancel(data.subscriptionId);
            }
            case 'refund-last-payment': {
                const customerId = await getCustomerId(uid);
                if (!customerId) throw new HttpsError('not-found', 'Customer not found');
                const paymentIntents = await stripe.paymentIntents.search({
                    query: `customer: '${customerId}' AND amount>1 AND status: 'succeeded'`,
                    limit: 1,
                });
                if (paymentIntents.data.length === 0) throw new HttpsError('not-found', 'No successful payment found');
                return await stripe.refunds.create({ payment_intent: paymentIntents.data[0].id });
            }
            case 'send-receipt': {
                const customerId = await getCustomerId(uid);
                if (!customerId) throw new HttpsError('not-found', 'Customer not found');
                const charges = await stripe.charges.search({
                    query: `customer: '${customerId}' AND status: 'succeeded'`,
                    limit: 1,
                });
                if (charges.data.length === 0) throw new HttpsError('not-found', 'No charge found');
                const updatedCharge = await stripe.charges.update(charges.data[0].id, { receipt_email: data.email });
                return { receipt_email: updatedCharge.receipt_email, receipt_url: charges.data[0].receipt_url };
            }
            case 'products': {
                return await stripe.products.list({ expand: ['data.default_price'], active: true });
            }
            default:
                throw new HttpsError('invalid-argument', `Unknown action: ${action}`);
        }
    } catch (error: any) {
        console.error(`Error in action ${action}:`, error);
        throw new HttpsError('internal', error.message);
    }
});

const webhookApp = express();
webhookApp.post('/', express.raw({ type: 'application/json' }), async (req: express.Request, res: express.Response) => {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event;
    try {
        if (!sig || !endpointSecret) throw new Error('Missing signature or secret');
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    if (event.type === 'invoice.payment_succeeded') {
        const invoice = event.data.object as Stripe.Invoice;
        const customerId = invoice.customer as string;
        const usersSnapshot = await admin.firestore().collection('users')
            .where('stripeCustomerId', '==', customerId).get();
        if (!usersSnapshot.empty) {
            const userDoc = usersSnapshot.docs[0];
            await userDoc.ref.update({
                'subscription.status': 'active',
                'subscription.updatedAt': admin.firestore.FieldValue.serverTimestamp()
            });
        }
    }
    res.json({ received: true });
});
exports.stripeWebhook = onRequest({ region: 'southamerica-east1' }, webhookApp);
