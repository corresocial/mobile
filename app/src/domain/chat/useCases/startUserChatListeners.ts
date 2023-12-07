import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function startUserChatListenersUC(chatIds: Id[], callback: (chatId: Id, messages: MessageObjects) => void) {
	const { existsOnDatabase, startUserChatListeners } = ChatGatewayAdapter()

	return chatIds.forEach(async (chatId: string) => {
		if (await existsOnDatabase(chatId)) {
			startUserChatListeners(chatId, callback)
		} else {
			console.log(`Esse chat não existe: ${chatId}`)
		}
	})
}

export { startUserChatListenersUC }
