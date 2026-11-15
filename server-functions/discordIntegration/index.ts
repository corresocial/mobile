import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import axios from 'axios';

if (!admin.apps.length) {
    admin.initializeApp();
}

// Discord accepts up to 2000 characters per message
const MAX_CONTENT_LENGTH = 1800;
const DISCORD_TIMEOUT_MS = 10000;

// Allowlist: type sent by the app -> env var (Secret Manager) holding the webhook URL
const DEFAULT_TYPE = 'fale-conosco';
const WEBHOOK_ENV_BY_TYPE = new Map<string, string>([
    ['erro', 'ERROS_WEBHOOK'],
    ['denúncia', 'DENUNCIAR_WEBHOOK'],
    // Fale conosco (the app sends 'melhoria' and 'outro')
    ['fale-conosco', 'FALECONOSCO_WEBHOOK'],
    ['melhoria', 'FALECONOSCO_WEBHOOK'],
    ['outro', 'FALECONOSCO_WEBHOOK'],
]);

exports.discordIntegration = onCall({ region: 'southamerica-east1' }, async (request) => {
    const { content, type: rawType } = (request.data || {}) as { content?: unknown, type?: unknown };

    const type = rawType === undefined || rawType === null ? DEFAULT_TYPE : rawType;
    const normalizedType = typeof type === 'string' ? type.normalize('NFC') : '';
    const webhookEnv = WEBHOOK_ENV_BY_TYPE.get(normalizedType);
    if (!webhookEnv) {
        throw new HttpsError('invalid-argument', 'Invalid type');
    }

    // Allow anonymous error reporting (the app reports errors before login)
    if (normalizedType !== 'erro' && !request.auth) {
        throw new HttpsError('unauthenticated', 'User must be logged in');
    }

    if (typeof content !== 'string' || !content.trim() || content.length > MAX_CONTENT_LENGTH) {
        throw new HttpsError('invalid-argument', `content must be a non-empty string up to ${MAX_CONTENT_LENGTH} characters`);
    }

    const webhookUrl = process.env[webhookEnv];
    if (!webhookUrl) {
        console.error(`Webhook URL not configured: ${webhookEnv}`);
        throw new HttpsError('internal', 'Server configuration error');
    }

    try {
        // Forward to Discord; allowed_mentions blocks @everyone/@here, role and user pings
        await axios.post(webhookUrl, {
            content,
            allowed_mentions: { parse: [] }
        }, {
            params: { wait: true },
            timeout: DISCORD_TIMEOUT_MS
        });
    } catch (error: unknown) {
        // Never log the axios error itself: error.config.url contains the webhook token
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        const code = axios.isAxiosError(error) ? error.code : (error as Error)?.name;
        console.error('Error forwarding to Discord:', { webhook: webhookEnv, status, code });
        throw new HttpsError('internal', 'Failed to send message');
    }

    return { ok: true };
});
