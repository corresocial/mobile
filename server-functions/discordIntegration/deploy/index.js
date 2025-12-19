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
const functions = __importStar(require("firebase-functions"));
const admin = __importStar(require("firebase-admin"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = require("express-rate-limit");
const axios_1 = __importDefault(require("axios"));
// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp();
}
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: true }));
app.use(express_1.default.json());
// Middleware to verify Firebase Auth Token
const authenticateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Allow anonymous error reporting (rate limited by IP)
    if (req.method === 'POST' && req.body && req.body.type === 'erro') {
        return next();
    }
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).send('Unauthorized: No token provided');
    }
    const token = authHeader.split('Bearer ')[1];
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    }
    catch (error) {
        return res.status(401).send('Unauthorized: Invalid token');
    }
});
// Rate Limiting: 5 requests per hour
const limiter = (0, express_rate_limit_1.rateLimit)({
    windowMs: 60 * 60 * 1000, // 1 hour
    limit: 5,
    message: 'Too many requests, please try again later.',
    keyGenerator: (req) => {
        var _a;
        // Use user ID from auth token
        return ((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid) || req.ip;
    }
});
app.use(authenticateUser);
app.use(limiter);
app.post('/send-message', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { content, type } = req.body;
        // Determine Webhook URL based on type
        let webhookUrl = process.env.FALECONOSCO_WEBHOOK;
        if (type === 'erro')
            webhookUrl = process.env.ERROS_WEBHOOK;
        if (type === 'denúncia')
            webhookUrl = process.env.DENUNCIAR_WEBHOOK;
        if (!webhookUrl) {
            console.error(`Webhook URL not configured for type: ${type}`);
            return res.status(500).json({ error: 'Server configuration error' });
        }
        // Forward to Discord
        const response = yield axios_1.default.post(`${webhookUrl}?wait=true`, {
            content: content
        });
        res.json(response.data);
    }
    catch (error) {
        console.error('Error forwarding to Discord:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
}));
exports.discordIntegration = functions.https.onRequest(app);
