import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function getUserChatsUC(chatIds: Id[]) {
	const { getUserChats } = useChatRepository()
	return getUserChats(chatIds)
}

export { getUserChatsUC }
