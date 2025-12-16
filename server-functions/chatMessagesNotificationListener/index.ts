import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { Expo, ExpoPushMessage } from 'expo-server-sdk'

const expo = new Expo({
    useFcmV1: true
})

admin.initializeApp()

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

interface EventFunction extends functions.Event { delta: any }

exports.chatMessagesNotificationListener = async (event: EventFunction, context: functions.EventContext) => {
    try {
        console.log(context.params)
        console.log(event.delta.owner)
        console.log(event.delta.metadata)

        const chatId = context.params.chatId
        const ownerMessageId = event.delta.owner

        const recipientUserId = chatId.split('-').find((id: string) => id !== ownerMessageId)

        const recipientTokenNotification = await getUserTokenNotification(recipientUserId)

        if (recipientTokenNotification) {
            const messageObject = structureMessageObject(event.delta)
            return sendPushNotification(recipientTokenNotification, messageObject)
        }
    } catch (error) {
        console.log(error)
    }
}

async function getUserTokenNotification(userId: string) {
    return admin.database().ref(`/${userId}/tokenNotification`).once('value').then((snapshot) => snapshot.val())
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
        const tickets = await expo.sendPushNotificationsAsync(chunks[0])
        console.log('Notificação enviada:', messageObject.title, expoPushToken)
    } catch (error) {
        console.error('Erro ao enviar notificação:', error)
    }
}