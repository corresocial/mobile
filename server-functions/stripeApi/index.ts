import { onCall, onRequest, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import express from 'express';
import { Stripe } from 'stripe';

if (!admin.apps.length) admin.initializeApp();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
    console.warn('WARNING: STRIPE_SECRET_KEY is missing. Stripe functionality will fail until it is set.');
}

const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder', {
    apiVersion: '2025-12-15.clover',
});

const SUBSCRIPTION_STATUSES = ['active', 'trialing', 'past_due', 'canceled', 'unpaid', 'incomplete', 'incomplete_expired', 'paused', 'all'];
const CUSTOMER_UPDATABLE_FIELDS = ['name', 'email', 'phone', 'address'];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// users/{uid}.stripeCustomerId pode ser escrito pelo cliente, então só é aceito
// se o customer no Stripe foi criado por esta função para o mesmo uid.
const getCustomerId = async (uid: string): Promise<string | null> => {
    const userDoc = await admin.firestore().collection('users').doc(uid).get();
    const customerId = userDoc.data()?.stripeCustomerId;
    if (!customerId || typeof customerId !== 'string') return null;

    try {
        const customer = await stripe.customers.retrieve(customerId);
        if (customer.deleted || customer.metadata?.firebaseUID !== uid) {
            console.warn(`stripeCustomerId of user ${uid} does not belong to them`);
            return null;
        }
        return customerId;
    } catch (error: any) {
        if (error?.code === 'resource_missing') return null;
        throw error;
    }
};

const assertSubscriptionOwner = async (subscriptionId: unknown, customerId: string) => {
    if (!subscriptionId || typeof subscriptionId !== 'string') {
        throw new HttpsError('invalid-argument', 'Missing subscriptionId');
    }
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription.customer !== customerId) {
        throw new HttpsError('permission-denied', 'Subscription does not belong to the user');
    }
    return subscription;
};

const assertSubscriptionPrice = async (priceId: unknown) => {
    if (!priceId || typeof priceId !== 'string') {
        throw new HttpsError('invalid-argument', 'Missing priceId');
    }
    const price = await stripe.prices.retrieve(priceId, { expand: ['product'] });
    const product = price.product as Stripe.Product;
    if (!price.active || price.type !== 'recurring' || !product?.active) {
        throw new HttpsError('invalid-argument', 'Price not available');
    }
};

const assertPaymentMethodOwner = async (paymentMethodId: unknown, customerId: string) => {
    if (!paymentMethodId || typeof paymentMethodId !== 'string') {
        throw new HttpsError('invalid-argument', 'Missing paymentMethodId');
    }
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    if (paymentMethod.customer !== customerId) {
        throw new HttpsError('permission-denied', 'Payment method does not belong to the user');
    }
};

const requireCustomerId = async (uid: string) => {
    const customerId = await getCustomerId(uid);
    if (!customerId) throw new HttpsError('not-found', 'Customer not found');
    return customerId;
};

exports.stripeApi = onCall({ region: 'southamerica-east1' }, async (request) => {
    if (!request.auth) throw new HttpsError('unauthenticated', 'User must be logged in');

    const { uid, token } = request.auth;
    const { action, ...data } = request.data || {};
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
                const customerId = await requireCustomerId(uid);
                const allowedData = Object.fromEntries(
                    Object.entries(data).filter(([key]) => CUSTOMER_UPDATABLE_FIELDS.includes(key))
                );
                if (allowedData.email !== undefined && !EMAIL_PATTERN.test(String(allowedData.email))) {
                    throw new HttpsError('invalid-argument', 'Invalid email');
                }
                return await stripe.customers.update(customerId, allowedData);
            }
            case 'payment-methods': {
                const customerId = await getCustomerId(uid);
                if (!customerId) return { data: [] };
                return await stripe.paymentMethods.list({ customer: customerId, type: 'card' });
            }
            case 'attach-payment-method': {
                const customerId = await requireCustomerId(uid);
                if (!data.paymentMethodId || typeof data.paymentMethodId !== 'string') {
                    throw new HttpsError('invalid-argument', 'Missing paymentMethodId');
                }
                return await stripe.paymentMethods.attach(data.paymentMethodId, { customer: customerId });
            }
            case 'set-default-payment-method': {
                const customerId = await requireCustomerId(uid);
                await assertPaymentMethodOwner(data.paymentMethodId, customerId);
                return await stripe.customers.update(customerId, {
                    invoice_settings: { default_payment_method: data.paymentMethodId },
                });
            }
            case 'subscriptions': {
                const customerId = await getCustomerId(uid);
                if (!customerId) return { data: [] };
                const status = data.status || 'active';
                if (!SUBSCRIPTION_STATUSES.includes(status)) {
                    throw new HttpsError('invalid-argument', 'Invalid status');
                }
                const res = await stripe.subscriptions.list({ customer: customerId, status });
                return res;
            }
            case 'create-subscription': {
                const customerId = await requireCustomerId(uid);
                // Período gratuito não pode ser pedido pelo cliente; é concedido por um admin no Stripe.
                if (data.freeTrial) throw new HttpsError('permission-denied', 'Free trial must be granted by an admin');
                await assertSubscriptionPrice(data.priceId);
                const subscription = await stripe.subscriptions.create({
                    customer: customerId,
                    items: [{ price: data.priceId }],
                    payment_behavior: 'allow_incomplete',
                    payment_settings: { save_default_payment_method: 'on_subscription' },
                    expand: ['latest_invoice.payment_intent'],
                });
                return {
                    subscriptionId: subscription.id,
                    clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
                };
            }
            case 'update-subscription': {
                const customerId = await requireCustomerId(uid);
                const sub = await assertSubscriptionOwner(data.subscriptionId, customerId);
                await assertSubscriptionPrice(data.priceId);
                const updatedSub = await stripe.subscriptions.update(sub.id, {
                    proration_behavior: 'always_invoice',
                    cancel_at_period_end: false,
                    proration_date: Math.floor((Date.now()) / 1000),
                    items: [{ id: sub.items.data[0].id, price: data.priceId }],
                });
                return updatedSub;
            }
            case 'cancel-subscription': {
                const customerId = await requireCustomerId(uid);
                const sub = await assertSubscriptionOwner(data.subscriptionId, customerId);
                return await stripe.subscriptions.cancel(sub.id);
            }
            case 'refund-last-payment': {
                const customerId = await requireCustomerId(uid);
                const paymentIntents = await stripe.paymentIntents.list({
                    customer: customerId,
                    limit: 10, // Fetch a few to find the latest succeeded one
                });
                const successfulPI = paymentIntents.data.find(pi => pi.status === 'succeeded' && pi.amount > 1);
                if (!successfulPI) throw new HttpsError('not-found', 'No successful payment found');
                return await stripe.refunds.create({ payment_intent: successfulPI.id });
            }
            case 'send-receipt': {
                const customerId = await requireCustomerId(uid);
                if (!data.email || !EMAIL_PATTERN.test(String(data.email))) {
                    throw new HttpsError('invalid-argument', 'Invalid email');
                }
                const charges = await stripe.charges.list({
                    customer: customerId,
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
        if (error instanceof HttpsError) throw error;
        // Não repassa a mensagem do Stripe ao cliente nem loga o objeto inteiro (pode conter client_secret).
        console.error(`Error in action ${action}:`, error?.type, error?.code, error?.message);
        throw new HttpsError('internal', 'Payment operation failed');
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
