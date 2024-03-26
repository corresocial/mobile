import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function updateUserTokenNotificationUC(userId: Id, tokenNotification: string) {
	const { getRemoteUserData, updateUserTokenNotification } = useChatRepository()

	return updateUserTokenNotification(userId, tokenNotification, getRemoteUserData)
}

export { updateUserTokenNotificationUC }
