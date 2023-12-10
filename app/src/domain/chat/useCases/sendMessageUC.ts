import { Message } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

import { PushNotificationService } from '@services/pushNotification/PushNotificationService'

async function sendMessageUC(message: Message, chatId: Id, recipientUserId: Id) {
	const { getRemoteUserData, sendMessage } = ChatGatewayAdapter()
	const { getNotificationConfig, sendPushNotification } = PushNotificationService()

	const messageSent = await sendMessage(message, chatId)

	if (messageSent) {
		const recipientUserData = await getRemoteUserData(recipientUserId)

		if (recipientUserData.tokenNotification) {
			const notificationConfig = getNotificationConfig(recipientUserData.tokenNotification || '', 'corre.', message.message)
			await sendPushNotification(notificationConfig)
		} else {
			console.log('Usuário sem token de notificação cadastrado')
		}

		// return notificationSend // confirmação de sms enviado
		return messageSent
	}

	return false
}

export { sendMessageUC }
