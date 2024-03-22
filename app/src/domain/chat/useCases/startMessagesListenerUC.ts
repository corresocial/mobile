import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/chat/gatewayAdapter/ChatGatewayAdapter'

async function startChatMessagesListenerUC(chatId: Id, callback: (newMessages: MessageObjects) => void) {
	const { existsOnDatabase, startChatMessagesListener } = ChatGatewayAdapter()

	if (await existsOnDatabase(chatId)) {
		startChatMessagesListener(chatId, callback)
	}
}

export { startChatMessagesListenerUC }
