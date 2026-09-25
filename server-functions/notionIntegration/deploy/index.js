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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("firebase-functions/v2/https");
const admin = __importStar(require("firebase-admin"));
const axios_1 = __importDefault(require("axios"));
const crypto_1 = require("crypto");
if (!admin.apps.length) {
    admin.initializeApp();
}
const NOTION_API_URL = 'https://api.notion.com/v1/pages';
const NOTION_VERSION = '2022-02-22';
const NOTION_TEXT_LIMIT = 2000; // Limite de caracteres por rich_text/title no Notion
const CONTACT_US_TYPES = ['erro', 'denúncia', 'melhoria', 'outro'];
const REPORTED_TARGETS = ['none', 'income', 'culture', 'socialImpact', 'user', 'poll', 'petition'];
const truncate = (text, limit) => {
    if (text.length >= limit)
        return `${text.substring(0, limit - 50)}...`;
    return text;
};
const getReportTitle = (message, title) => {
    if (title)
        return title;
    if (message.length > 15)
        return `${message.split(' ', 15).join(' ')}...`;
    return message;
};
const richText = (content) => [{ type: 'text', text: { content: content || '---' } }];
exports.notionIntegration = (0, https_1.onCall)({ region: 'southamerica-east1' }, (request) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { type, title, message, reportedTarget, reportedId } = request.data || {};
    // Allow anonymous error reporting
    if (type !== 'erro') {
        if (!request.auth) {
            throw new https_1.HttpsError('unauthenticated', 'User must be logged in');
        }
    }
    if (!CONTACT_US_TYPES.includes(type)) {
        throw new https_1.HttpsError('invalid-argument', `Invalid type: ${type}`);
    }
    if (typeof message !== 'string' || !message.trim()) {
        throw new https_1.HttpsError('invalid-argument', 'Message is required');
    }
    const notionKey = process.env.NOTION_FALECONOSCO_KEY;
    const notionDatabaseId = process.env.NOTION_FALECONOSCO_ID;
    if (!notionKey || !notionDatabaseId) {
        console.error('Notion credentials not configured');
        throw new https_1.HttpsError('internal', 'Server configuration error');
    }
    const reportId = (0, crypto_1.randomUUID)();
    const senderId = ((_a = request.auth) === null || _a === void 0 ? void 0 : _a.uid) || 'anonymous';
    const customTitle = truncate(getReportTitle(message, typeof title === 'string' ? title : undefined), NOTION_TEXT_LIMIT);
    const customMessage = truncate(message, NOTION_TEXT_LIMIT);
    const target = REPORTED_TARGETS.includes(reportedTarget) ? reportedTarget : 'none';
    const targetId = typeof reportedId === 'string' ? truncate(reportedId, NOTION_TEXT_LIMIT) : '';
    try {
        const response = yield axios_1.default.post(NOTION_API_URL, {
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
    }
    catch (error) {
        console.error('Error creating Notion page:', ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message);
        throw new https_1.HttpsError('internal', 'Failed to send message');
    }
}));
