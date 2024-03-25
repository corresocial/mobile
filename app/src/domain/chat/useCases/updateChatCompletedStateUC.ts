import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

import { usePushNotificationService } from '@services/pushNotification/usePushNotificationService'

async function updateChatCompletedStateUC(chatId: Id, currentCompletedState: boolean, recipientUserId?: Id, senderUserName?: string) {
	const { getRemoteUserData, updateChatCompletedState } = useChatRepository()
	const { getNotificationConfig, sendPushNotification } = usePushNotificationService()

	const updatedCompletedStatus = await updateChatCompletedState(chatId, !!currentCompletedState)

	if (updatedCompletedStatus && recipientUserId) {
		const recipientUserData = await getRemoteUserData(recipientUserId)

		if (recipientUserData.tokenNotification) {
			const customMessage = `${senderUserName || 'um corredor'} marcou uma conversa com você como finalizada`
			const notificationConfig = getNotificationConfig(recipientUserData.tokenNotification || '', 'corre.', customMessage)
			await sendPushNotification(notificationConfig)
		} else {
			console.log('Usuário sem token de notificação cadastrado')
		}
	}
}

export { updateChatCompletedStateUC }
