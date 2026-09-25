import { onCall, HttpsError } from 'firebase-functions/v2/https';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { randomUUID } from 'crypto';

if (!admin.apps.length) {
    admin.initializeApp();
}

const NOTION_API_URL = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-02-22';
const NOTION_TEXT_LIMIT = 2000; // Limite de caracteres por rich_text/title no Notion

const CONTACT_US_TYPES = ['erro', 'denúncia', 'melhoria', 'outro'];
const REPORTED_TARGETS = ['none', 'income', 'culture', 'socialImpact', 'user', 'poll', 'petition'];

const truncate = (text: string, limit: number) => {
    if (text.length >= limit) return `${text.substring(0, limit - 50)}...`;
    return text;
};

const getReportTitle = (message: string, title?: string) => {
    if (title) return title;
    if (message.length > 15) return `${message.split(' ', 15).join(' ')}...`;
    return message;
};

const richText = (content: string) => [{ type: 'text', text: { content: content || '---' } }];

exports.notionIntegration = onCall({ region: 'southamerica-east1' }, async (request) => {
    const { type, title, message, reportedTarget, reportedId } = request.data || {};

    // Allow anonymous error reporting
    if (type !== 'erro') {
        if (!request.auth) {
            throw new HttpsError('unauthenticated', 'User must be logged in');
        }
    }

    if (!CONTACT_US_TYPES.includes(type)) {
        throw new HttpsError('invalid-argument', `Invalid type: ${type}`);
    }
    if (typeof message !== 'string' || !message.trim()) {
        throw new HttpsError('invalid-argument', 'Message is required');
    }

    const notionKey = process.env.NOTION_FALECONOSCO_KEY;
    const notionDatabaseId = process.env.NOTION_FALECONOSCO_ID;

    if (!notionKey || !notionDatabaseId) {
        console.error('Notion credentials not configured');
        throw new HttpsError('internal', 'Server configuration error');
    }

    const reportId = randomUUID();
    const senderId = request.auth?.uid || 'anonymous';
    const customTitle = truncate(getReportTitle(message, typeof title === 'string' ? title : undefined), NOTION_TEXT_LIMIT);
    const customMessage = truncate(message, NOTION_TEXT_LIMIT);
    const target = REPORTED_TARGETS.includes(reportedTarget) ? reportedTarget : 'none';
    const targetId = typeof reportedId === 'string' ? truncate(reportedId, NOTION_TEXT_LIMIT) : '';

    try {
        const response = await axios.post(NOTION_API_URL, {
            parent: { database_id: notionDatabaseId },
            properties: {
                ID: { rich_text: richText(reportId) },
                type: { select: { name: type } },
                title: { title: richText(customTitle) },
                description: { rich_text: richText(customMessage) },
                image: { rich_text: richText('---') },
                reportedTarget: { select: { name: target } },
                reportedId: { rich_text: richText(targetId) },
                senderId: { rich_text: richText(senderId) },
                created: { date: { start: new Date().toISOString() } },
                status: { select: { name: 'not started' } },
            },
        }, {
            headers: {
                Accept: 'application/json',
                'Notion-Version': NOTION_VERSION,
                'Content-Type': 'application/json',
                Authorization: `Bearer ${notionKey}`,
            },
        });

        return { id: response.data.id, object: 'page', reportId };

    } catch (error: any) {
        console.error('Error creating Notion page:', error.response?.data || error.message);
        throw new HttpsError('internal', 'Failed to send message');
    }
});
