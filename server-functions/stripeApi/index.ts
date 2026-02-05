import { onRequest } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import { Stripe } from 'stripe';
import { validateAuthToken, AuthError } from './validateAuthToken';

if (!admin.apps.length) admin.initializeApp();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing. Stripe functionality will fail until it is set.');
}

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
    apiVersion: '2026-01-28.clover',
});

const getCustomerId = async (uid: string) => {
    console.log('getCustomerId', uid);
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    return userDoc.data()?.stripeCustomerId;
};

exports.stripeApi = onRequest({ region: 'southamerica-east1' }, async (request, response) => {
    // Validate authentication token
    let auth;
    try {
        auth = await validateAuthToken(request);
        console.log(`Authenticated user: ${auth.uid}`);
    } catch (error) {
        if (error instanceof AuthError) {
            response.status(401).json({
                error: error.message,
                code: error.code
            });
            return;
        }
        response.status(401).json({ error: 'Authentication failed' });
        return;
    }

    const { uid, email, name } = auth;
    const { action, ...data } = request.body;

    try {
        let result;
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
                result = { customerId };
                break;
            }
            case 'update-customer': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    response.status(404).json({ error: 'Customer not found', code: 'not-found' });
                    return;
                }
                result = await stripe.customers.update(customerId, data);
                break;
            }
            case 'payment-methods': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    result = { data: [] };
                    break;
                }
                result = await stripe.paymentMethods.list({ customer: customerId, type: 'card' });
                break;
            }
            case 'attach-payment-method': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    response.status(404).json({ error: 'Customer not found', code: 'not-found' });
                    return;
                }
                result = await stripe.paymentMethods.attach(data.paymentMethodId, { customer: customerId });
                break;
            }
            case 'set-default-payment-method': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    response.status(404).json({ error: 'Customer not found', code: 'not-found' });
                    return;
                }
                result = await stripe.customers.update(customerId, {
                    invoice_settings: { default_payment_method: data.paymentMethodId },
                });
                break;
            }
            case 'subscriptions': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    result = { data: [] };
                    break;
                }
                result = await stripe.subscriptions.list({
                    customer: customerId,
                    status: data.status || 'active',
                });
                break;
            }
            case 'create-subscription': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    response.status(404).json({ error: 'Customer not found', code: 'not-found' });
                    return;
                }
                const trialEndDate = Math.round((Date.now() / 1000)) + 31650000;
                const freeTrialParams = data.freeTrial ? { trial_end: trialEndDate } : {};
                const subscription = await stripe.subscriptions.create({
                    customer: customerId,
                    items: [{ price: data.priceId }],
                    ...freeTrialParams,
                    payment_behavior: 'allow_incomplete',
                    payment_settings: { save_default_payment_method: 'on_subscription' },
                    expand: ['latest_invoice.payment_intent'],
                });
                console.log('sub', JSON.stringify(subscription))
                result = {
                    subscriptionId: subscription.id,
                    clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
                };
                break;
            }
            case 'update-subscription': {
                console.log('update-subscription', data.subscriptionId, data.priceId);
                const sub = await stripe.subscriptions.retrieve(data.subscriptionId);
                if (!sub) {
                    response.status(404).json({ error: 'Subscription not found', code: 'not-found' });
                    return;
                }
                console.log('sub-to-update', JSON.stringify(sub));
                const updatedSub = await stripe.subscriptions.update(data.subscriptionId, {
                    proration_behavior: 'always_invoice',
                    cancel_at_period_end: false,
                    proration_date: Math.floor((Date.now()) / 1000),
                    items: [{ id: sub.items.data[0].id, price: data.priceId }],
                });
                console.log('updated-sub', JSON.stringify(updatedSub));
                result = updatedSub;
                break;
            }
            case 'cancel-subscription': {
                result = await stripe.subscriptions.cancel(data.subscriptionId);
                break;
            }
            case 'refund-last-payment': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    response.status(404).json({ error: 'Customer not found', code: 'not-found' });
                    return;
                }
                const paymentIntents = await stripe.paymentIntents.list({
                    customer: customerId,
                    limit: 10, // Fetch a few to find the latest succeeded one
                });
                const successfulPI = paymentIntents.data.find(pi => pi.status === 'succeeded' && pi.amount > 1);
                if (!successfulPI) {
                    response.status(404).json({ error: 'No successful payment found', code: 'not-found' });
                    return;
                }
                result = await stripe.refunds.create({ payment_intent: successfulPI.id });
                break;
            }
            case 'send-receipt': {
                const customerId = await getCustomerId(uid);
                if (!customerId) {
                    response.status(404).json({ error: 'Customer not found', code: 'not-found' });
                    return;
                }
                const charges = await stripe.charges.list({
                    customer: customerId,
                    limit: 1,
                });
                if (charges.data.length === 0) {
                    response.status(404).json({ error: 'No charge found', code: 'not-found' });
                    return;
                }
                const updatedCharge = await stripe.charges.update(charges.data[0].id, { receipt_email: data.email });
                result = { receipt_email: updatedCharge.receipt_email, receipt_url: charges.data[0].receipt_url };
                break;
            }
            case 'products': {
                result = await stripe.products.list({ expand: ['data.default_price'], active: true });
                break;
            }
            default:
                response.status(400).json({ error: `Unknown action: ${action}`, code: 'invalid-argument' });
                return;
        }

        response.status(200).json(result);
    } catch (error: any) {
        console.error(`Error in action ${action}:`, error);
        response.status(500).json({ error: error.message, code: 'internal' });
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
