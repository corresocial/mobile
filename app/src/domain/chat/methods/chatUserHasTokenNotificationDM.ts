import { Id } from '@domain/globalTypes'

import { ChatRepositoryInterface } from '@data/chat/ChatRepositoryInterface'

async function chatUserHasTokenNotificationDM(userId: Id, useChatRepository: () => ChatRepositoryInterface) {
	const { getRemoteUserData } = useChatRepository()

	const remoteUser = await getRemoteUserData(userId)
	return !!(remoteUser && remoteUser.tokenNotification)
}

export { chatUserHasTokenNotificationDM }
