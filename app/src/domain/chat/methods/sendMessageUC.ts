import { Message } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function sendMessageUC(message: Message, chatId: Id, recipientUserName: string) {
	const { sendMessage } = useChatRepository()

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
