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
const admin = __importStar(require("firebase-admin"));
const expo_server_sdk_1 = require("expo-server-sdk");
const expo = new expo_server_sdk_1.Expo({
    useFcmV1: true
});
admin.initializeApp();
exports.chatMessagesNotificationListener = (event, context) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(context.params);
        console.log(event.delta.owner);
        console.log(event.delta.metadata);
        const chatId = context.params.chatId;
        const ownerMessageId = event.delta.owner;
        const recipientUserId = chatId.split('-').find((id) => id !== ownerMessageId);
        const recipientTokenNotification = yield getUserTokenNotification(recipientUserId);
        if (recipientTokenNotification) {
            const messageObject = structureMessageObject(event.delta);
            return sendPushNotification(recipientTokenNotification, messageObject);
        }
    }
    catch (error) {
        console.log(error);
    }
});
function getUserTokenNotification(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return admin.database().ref(`/${userId}/tokenNotification`).once('value').then((snapshot) => snapshot.val());
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
            body: messageObject.body
        });
        try {
            if (!expo_server_sdk_1.Expo.isExpoPushToken(expoPushToken)) {
                console.error('Token inválido:', expoPushToken);
                return;
            }
            const chunks = expo.chunkPushNotifications(messages);
            const tickets = yield expo.sendPushNotificationsAsync(chunks[0]);
            console.log('Notificação enviada:', messageObject.title, expoPushToken);
        }
        catch (error) {
            console.error('Erro ao enviar notificação:', error);
        }
    });
}
