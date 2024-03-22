import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

function unsubscribeChatMessagesListenerUC(chatId: Id) {
	const { unsubscribeChatMessagesListener } = useChatRepository()

	try {
		unsubscribeChatMessagesListener(chatId)
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeChatMessagesListenerUC }
