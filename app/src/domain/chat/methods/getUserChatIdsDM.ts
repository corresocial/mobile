import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function getUserChatIdsDM(userId: Id) {
	const { getUserChatIds } = useChatRepository()
	return getUserChatIds(userId)
}

export { getUserChatIdsDM }
