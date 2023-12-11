import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function makeAllUserMessagesAsReadUC(chatId: Id, userId: Id) {
	const { getRemoteChatData, updateChatMessages } = ChatGatewayAdapter()

	if (!chatId || !userId) return false

	const { messages } = await getRemoteChatData(chatId)

	if (!messages || (messages && !Object.values(messages).length)) return false

	const readedMessages = updateReadState(messages, userId)
	const updatedChatMessages = convertArrayMessagesToObjectMessages(readedMessages)

	return updateChatMessages(chatId, updatedChatMessages)
}

function updateReadState(messages: MessageObjects, ownerUserId: Id) {
	return Object.entries(messages).map((message) => {
		if (message[1].owner !== ownerUserId) {
			return { [message[0]]: { ...message[1], readed: true } }
		}
		return { [message[0]]: { ...message[1] } }
	})
}

function convertArrayMessagesToObjectMessages(array: MessageObjects[]) {
	return array.reduce((total, current) => {
		return { ...total, ...current }
	}, {})
}

export { makeAllUserMessagesAsReadUC }
