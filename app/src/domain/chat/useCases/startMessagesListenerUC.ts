import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function startChatMessagesListenerUC(chatId: Id, callback: (newMessages: MessageObjects) => void) {
	const { existsOnDatabase, startChatMessagesListener } = useChatRepository()

	if (await existsOnDatabase(chatId)) {
		startChatMessagesListener(chatId, callback)
	}
}

export { startChatMessagesListenerUC }
