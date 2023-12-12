import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

import { PushNotificationService } from '@services/pushNotification/PushNotificationService'

async function updateChatCompletedStateUC(chatId: Id, currentCompletedState: boolean, recipientUserId?: Id, senderUserName?: string) {
	const { getRemoteUserData, updateChatCompletedState } = ChatGatewayAdapter()
	const { getNotificationConfig, sendPushNotification } = PushNotificationService()

	const updatedCompletedStatus = await updateChatCompletedState(chatId, !!currentCompletedState)

	if (updatedCompletedStatus && recipientUserId) {
		const recipientUserData = await getRemoteUserData(recipientUserId)

		if (recipientUserData.tokenNotification) {
			const customMessage = `${senderUserName || 'um corredor'} marcou uma conversa com você como finalizado`
			const notificationConfig = getNotificationConfig(recipientUserData.tokenNotification || '', 'corre.', customMessage)
			await sendPushNotification(notificationConfig)
		} else {
			console.log('Usuário sem token de notificação cadastrado')
		}
	}
}

export { updateChatCompletedStateUC }
