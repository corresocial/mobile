import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function getUserChatsDM(chatIds: Id[]) {
	const { getUserChats } = useChatRepository()
	return getUserChats(chatIds)
}

export { getUserChatsDM }
