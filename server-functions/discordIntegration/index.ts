import { onRequest, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { validateAuthToken, AuthError } from './validateAuthToken';

if (!admin.apps.length) {
    admin.initializeApp();
}

exports.discordIntegration = onRequest({ region: 'southamerica-east1' }, async (request, response) => {
    const { content, type } = request.body;

    // Allow anonymous error reporting, require auth for other types
    if (type !== 'erro') {
        try {
            const auth = await validateAuthToken(request);
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
    }

    // Determine Webhook URL based on type
    let webhookUrl = process.env.FALECONOSCO_WEBHOOK;
    if (type === 'erro') webhookUrl = process.env.ERROS_WEBHOOK;
    if (type === 'denúncia') webhookUrl = process.env.DENUNCIAR_WEBHOOK;

    if (!webhookUrl) {
        console.error(`Webhook URL not configured for type: ${type}`);
        response.status(500).json({
            error: 'Server configuration error',
            code: 'internal'
        });
        return;
    }

    try {
        // Forward to Discord
        const axiosResponse = await axios.post(`${webhookUrl}?wait=true`, {
            content: content
        });

        response.status(200).json(axiosResponse.data);

    } catch (error: any) {
        console.error('Error forwarding to Discord:', error);
        response.status(500).json({
            error: 'Failed to send message',
            code: 'internal'
        });
    }
});
