import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

async function updateUserTokenNotificationUC(userId: Id, tokenNotification: string) {
	const { getRemoteUserData, updateUserTokenNotification } = ChatGatewayAdapter()

	return updateUserTokenNotification(userId, tokenNotification, getRemoteUserData)
}

export { updateUserTokenNotificationUC }
