import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

function unsubscribeChatMessagesListenerDM(chatId: Id) {
	const { unsubscribeChatMessagesListener } = useChatRepository()

	try {
		unsubscribeChatMessagesListener(chatId)
	} catch (err) {
		console.log(err)
	}
}

export { unsubscribeChatMessagesListenerDM }
