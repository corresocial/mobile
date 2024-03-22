import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function getUserChatIdsUC(userId: Id) {
	const { getUserChatIds } = useChatRepository()
	return getUserChatIds(userId)
}

export { getUserChatIdsUC }
