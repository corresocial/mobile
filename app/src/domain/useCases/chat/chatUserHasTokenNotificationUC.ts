import { Id } from '@domain/entities/globalTypes'

import { ChatRepositoryInterface } from '@data/chat/ChatRepositoryInterface'

async function chatUserHasTokenNotificationUC(userId: Id, ChatRepositoryAdapter: () => ChatRepositoryInterface) {
	const { getRemoteUserData } = ChatRepositoryAdapter()

	const remoteUser = await getRemoteUserData(userId)
	return !!(remoteUser && remoteUser.tokenNotification)
}

export { chatUserHasTokenNotificationUC }
