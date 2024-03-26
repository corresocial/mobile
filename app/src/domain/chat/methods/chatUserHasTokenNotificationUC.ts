import { Id } from '@domain/globalTypes'

import { ChatRepositoryInterface } from '@data/chat/ChatRepositoryInterface'

async function chatUserHasTokenNotificationUC(userId: Id, useChatRepository: () => ChatRepositoryInterface) {
	const { getRemoteUserData } = useChatRepository()

	const remoteUser = await getRemoteUserData(userId)
	return !!(remoteUser && remoteUser.tokenNotification)
}

export { chatUserHasTokenNotificationUC }
