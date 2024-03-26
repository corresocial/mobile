import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function startChatMessagesListenerUC(chatId: Id, callback: (newMessages: MessageObjects) => void) {
	const { existsOnDatabase, startChatMessagesListener } = useChatRepository()

	if (await existsOnDatabase(chatId)) {
		startChatMessagesListener(chatId, callback)
	}
}

export { startChatMessagesListenerUC }
