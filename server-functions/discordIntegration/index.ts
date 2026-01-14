import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import axios from 'axios';

if (!admin.apps.length) {
    admin.initializeApp();
}

exports.discordIntegration = onCall({ region: 'southamerica-east1' }, async (request) => {
    const { content, type } = request.data;

    // Allow anonymous error reporting
    if (type !== 'erro') {
        if (!request.auth) {
            throw new HttpsError('unauthenticated', 'User must be logged in');
        }
    }

    // Determine Webhook URL based on type
    let webhookUrl = process.env.FALECONOSCO_WEBHOOK;
    if (type === 'erro') webhookUrl = process.env.ERROS_WEBHOOK;
    if (type === 'denúncia') webhookUrl = process.env.DENUNCIAR_WEBHOOK;

    if (!webhookUrl) {
        console.error(`Webhook URL not configured for type: ${type}`);
        throw new HttpsError('internal', 'Server configuration error');
    }

    try {
        // Forward to Discord
        const response = await axios.post(`${webhookUrl}?wait=true`, {
            content: content
        });

        return response.data;

    } catch (error: any) {
        console.error('Error forwarding to Discord:', error);
        throw new HttpsError('internal', 'Failed to send message');
    }
});
