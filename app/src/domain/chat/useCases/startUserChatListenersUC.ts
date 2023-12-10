import { MessageObjects, ObjectChatIds } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function startUserChatListenersUC(chatIds: Id[], callback: (chatId: Id, messages: MessageObjects) => void) {
	const { existsOnDatabase, startUserChatListener } = ChatGatewayAdapter()

	const chatIdsList = convertChatIdsToArray(chatIds as any) // TODO Type

	return chatIdsList.forEach(async (chatId: string) => {
		if (await existsOnDatabase(chatId)) {
			startUserChatListener(chatId, callback)
		} else {
			console.log(`Esse chat não existe: ${chatId}`)
		}
	})
}

function convertChatIdsToArray(chatIds: ObjectChatIds): Id[] {
	return Object.values(chatIds).map((chatId) => chatId)
}

export { startUserChatListenersUC }
