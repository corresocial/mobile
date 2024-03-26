import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function getRemoteUserDataUC(userId: Id) {
	const { getRemoteUserData } = useChatRepository()
	return getRemoteUserData(userId)
}

export { getRemoteUserDataUC }
