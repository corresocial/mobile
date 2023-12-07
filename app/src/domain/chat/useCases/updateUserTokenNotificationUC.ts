import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function updateUserTokenNotificationUC(userId: Id, tokenNotification: string) {
	const { getRemoteUserData, updateUserTokenNotification } = ChatGatewayAdapter()

	const remoteUser = await getRemoteUserData(userId)

	if (remoteUser.tokenNotification !== tokenNotification) {
		const updatedRemoteuser = { ...remoteUser, tokenNotification }
		return updateUserTokenNotification(userId, updatedRemoteuser)
	}

	return false
}

export { updateUserTokenNotificationUC }
