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
const validateAuthToken_1 = require("./validateAuthToken");
if (!admin.apps.length) {
    admin.initializeApp();
}
exports.discordIntegration = (0, https_1.onRequest)({ region: 'southamerica-east1' }, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { content, type } = request.body;
    // Allow anonymous error reporting, require auth for other types
    if (type !== 'erro') {
        try {
            const auth = yield (0, validateAuthToken_1.validateAuthToken)(request);
            console.log(`Authenticated user: ${auth.uid}`);
        }
        catch (error) {
            if (error instanceof validateAuthToken_1.AuthError) {
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
    if (type === 'erro')
        webhookUrl = process.env.ERROS_WEBHOOK;
    if (type === 'denúncia')
        webhookUrl = process.env.DENUNCIAR_WEBHOOK;
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
        const axiosResponse = yield axios_1.default.post(`${webhookUrl}?wait=true`, {
            content: content
        });
        response.status(200).json(axiosResponse.data);
    }
    catch (error) {
        console.error('Error forwarding to Discord:', error);
        response.status(500).json({
            error: 'Failed to send message',
            code: 'internal'
        });
    }
}));
