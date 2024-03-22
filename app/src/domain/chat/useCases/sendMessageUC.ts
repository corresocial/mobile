import { Message } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/chat/gatewayAdapter/ChatGatewayAdapter'

async function sendMessageUC(message: Message, chatId: Id, recipientUserName: string) {
	const { sendMessage } = ChatGatewayAdapter()

	return sendMessage({ ...message, metadata: { title: recipientUserName } }, chatId)

	/* if (messageSent) { // Migrated to google cloud listener
		const recipientUserData = await getRemoteUserData(recipientUserId)

		if (recipientUserData.tokenNotification) {
			const notificationConfig = getNotificationConfig(recipientUserData.tokenNotification || '', 'corre.', message.message)
			// await sendPushNotification(notificationConfig)
		} else {
			console.log('Usuário sem token de notificação cadastrado')
		}

		// return notificationSend // confirmação de sms enviado
		return messageSent
	} */
}

export { sendMessageUC }
