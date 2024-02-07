import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapterInterface as ChatRepositoryAdapterInterface } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapterInterface'

async function chatUserHasTokenNotificationUC(userId: Id, ChatRepositoryAdapter: () => ChatRepositoryAdapterInterface) {
	const { getRemoteUserData } = ChatRepositoryAdapter()

	const remoteUser = await getRemoteUserData(userId)
	return !!(remoteUser && remoteUser.tokenNotification)
}

export { chatUserHasTokenNotificationUC }
