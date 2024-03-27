import { Chat } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function startUserChatListenersDM(chatIds: Id[], callback: (chatId: Id, updatedChat: Chat) => void) {
	const { existsOnDatabase, startUserChatListener } = useChatRepository()

	const chatIdsList = convertChatIdsToArray(chatIds as any)

	return chatIdsList.forEach(async (chatId: string) => {
		if (await existsOnDatabase(chatId)) {
			startUserChatListener(chatId, callback)
		} else {
			console.log(`Esse chat não existe: ${chatId}`)
		}
	})
}

function convertChatIdsToArray(chatIds: object | any[]): Id[] { // ObjectChatIds
	if (Array.isArray(chatIds)) return chatIds
	return Object.values(chatIds).map((chatId) => chatId)
}

export { startUserChatListenersDM }
