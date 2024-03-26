import { Chat } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function startUserChatListenersDM(chatIds: Id[], callback: (chatId: Id, updatedChat: Chat) => void) {
	const { existsOnDatabase, startUserChatListener } = useChatRepository()

	return chatIds.forEach(async (chatId: string) => {
		if (await existsOnDatabase(chatId)) {
			startUserChatListener(chatId, callback)
		} else {
			console.log(`Esse chat não existe: ${chatId}`)
		}
	})
}

export { startUserChatListenersDM }
