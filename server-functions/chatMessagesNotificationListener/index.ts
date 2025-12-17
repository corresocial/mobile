import { onValueCreated } from 'firebase-functions/v2/database'
import * as admin from 'firebase-admin'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'

// Initialize Expo
const expo = new Expo({ useFcmV1: true })

// Initialize Admin
if (!admin.apps.length) {
    admin.initializeApp()
}

// Interfaces
interface Message {
    message: string
    dateTime: Date | number
    readed: boolean
    owner: string
    justOwner?: boolean
    userCanView?: string
    metadata?: { title?: string, smasProject?: string }
}

interface MessageNotificationObject {
    title: string
    body: string
}

// v2 Configuration
const functionOptions = {
    region: 'southamerica-east1', // Matches your README location
    ref: '/{chatId}/messages/{messageId}', // Matches your README path
    maxInstances: 10, // Good practice for scalability control
}

// Main Export
export const chatMessagesNotificationListener = onValueCreated(functionOptions, async (event) => {
    try {
        // 1. DATA: Get the new message object
        // In v2, event.data is a DataSnapshot. .val() gets the object.
        const messageData = event.data.val() as Message | null

        // Safety check: if data is null, the node was deleted (shouldn't happen in onValueCreated, but good practice)
        if (!messageData) return

        // 2. PARAMS: Access wildcard variables from event.params
        const { chatId } = event.params

        console.log('Params:', event.params)
        console.log('Owner:', messageData.owner)
        console.log('Metadata:', messageData.metadata)

        const ownerMessageId = messageData.owner

        // Logic to find recipient (assuming chatId format "userA-userB")
        const recipientUserId = chatId.split('-').find((id: string) => id !== ownerMessageId)

        if (!recipientUserId) {
            console.log('Recipient not found for chat:', chatId)
            return
        }

        const recipientTokenNotification = await getUserTokenNotification(recipientUserId)

        if (recipientTokenNotification) {
            const messageObject = structureMessageObject(messageData)
            return sendPushNotification(recipientTokenNotification, messageObject)
        }
    } catch (error) {
        console.error('Error in chatMessagesNotificationListener:', error)
    }
})

// --- Helper Functions (Logic Unchanged) ---

async function getUserTokenNotification(userId: string) {
    const snapshot = await admin.database().ref(`/${userId}/tokenNotification`).once('value')
    return snapshot.val()
}

function structureMessageObject(messageData: Message) {
    const smasProjects = ["BEE", "PBF"]

    if (messageData.metadata) {
        if (messageData.metadata.smasProject && smasProjects.includes(messageData.metadata.smasProject)) {
            return {
                title: messageData.metadata.smasProject === "BEE" ? 'Benefício Eventual Emergencial' : 'Bolsa Família',
                body: messageData.message
            }
        }

        if (messageData.metadata.title) {
            return {
                title: messageData.metadata.title,
                body: messageData.message
            }
        }
    }

    return { title: 'corre.social', body: messageData.message }
}

async function sendPushNotification(expoPushToken: string, messageObject: MessageNotificationObject) {
    const messages: ExpoPushMessage[] = []
    messages.push({
        to: expoPushToken,
        sound: 'default',
        title: messageObject.title,
        body: messageObject.body,
        categoryId: 'default',
        channelId: 'default'
    })

    try {
        if (!Expo.isExpoPushToken(expoPushToken)) {
            console.error('Token inválido:', expoPushToken)
            return
        }

        const chunks = expo.chunkPushNotifications(messages)
        // Note: You generally only have 1 chunk here, but this is fine
        const tickets = await expo.sendPushNotificationsAsync(chunks[0])
        console.log('Notificação enviada:', messageObject.title, expoPushToken)
    } catch (error) {
        console.error('Erro ao enviar notificação:', error)
    }
}