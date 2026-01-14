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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatMessagesNotificationListener = void 0;
const database_1 = require("firebase-functions/v2/database");
const admin = __importStar(require("firebase-admin"));
const expo_server_sdk_1 = require("expo-server-sdk");
// Initialize Expo
const expo = new expo_server_sdk_1.Expo({ useFcmV1: true });
// Initialize Admin
if (!admin.apps.length) {
    admin.initializeApp();
}
// v2 Configuration
const functionOptions = {
    region: 'southamerica-east1', // Matches your README location
    ref: '/{chatId}/messages/{messageId}', // Matches your README path
    maxInstances: 10, // Good practice for scalability control
};
// Main Export
exports.chatMessagesNotificationListener = (0, database_1.onValueCreated)(functionOptions, (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. DATA: Get the new message object
        // In v2, event.data is a DataSnapshot. .val() gets the object.
        const messageData = event.data.val();
        // Safety check: if data is null, the node was deleted (shouldn't happen in onValueCreated, but good practice)
        if (!messageData)
            return;
        // 2. PARAMS: Access wildcard variables from event.params
        const { chatId } = event.params;
        console.log('Params:', event.params);
        console.log('Owner:', messageData.owner);
        console.log('Metadata:', messageData.metadata);
        const ownerMessageId = messageData.owner;
        // Logic to find recipient (assuming chatId format "userA-userB")
        const recipientUserId = chatId.split('-').find((id) => id !== ownerMessageId);
        if (!recipientUserId) {
            console.log('Recipient not found for chat:', chatId);
            return;
        }
        const recipientTokenNotification = yield getUserTokenNotification(recipientUserId);
        if (recipientTokenNotification) {
            const messageObject = structureMessageObject(messageData);
            return sendPushNotification(recipientTokenNotification, messageObject);
        }
    }
    catch (error) {
        console.error('Error in chatMessagesNotificationListener:', error);
    }
}));
// --- Helper Functions (Logic Unchanged) ---
function getUserTokenNotification(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const snapshot = yield admin.database().ref(`/${userId}/tokenNotification`).once('value');
        return snapshot.val();
    });
}
function structureMessageObject(messageData) {
    const smasProjects = ["BEE", "PBF"];
    if (messageData.metadata) {
        if (messageData.metadata.smasProject && smasProjects.includes(messageData.metadata.smasProject)) {
            return {
                title: messageData.metadata.smasProject === "BEE" ? 'Benefício Eventual Emergencial' : 'Bolsa Família',
                body: messageData.message
            };
        }
        if (messageData.metadata.title) {
            return {
                title: messageData.metadata.title,
                body: messageData.message
            };
        }
    }
    return { title: 'corre.social', body: messageData.message };
}
function sendPushNotification(expoPushToken, messageObject) {
    return __awaiter(this, void 0, void 0, function* () {
        const messages = [];
        messages.push({
            to: expoPushToken,
            sound: 'default',
            title: messageObject.title,
            body: messageObject.body,
            categoryId: 'default',
            channelId: 'default'
        });
        try {
            if (!expo_server_sdk_1.Expo.isExpoPushToken(expoPushToken)) {
                console.error('Token inválido:', expoPushToken);
                return;
            }
            const chunks = expo.chunkPushNotifications(messages);
            // Note: You generally only have 1 chunk here, but this is fine
            const tickets = yield expo.sendPushNotificationsAsync(chunks[0]);
            console.log('Notificação enviada:', messageObject.title, expoPushToken);
        }
        catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    });
}
