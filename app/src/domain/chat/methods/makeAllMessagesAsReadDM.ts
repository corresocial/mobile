import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function makeAllUserMessagesAsReadDM(chatId: Id, userId: Id) {
	const { getRemoteChatData, updateChatMessages } = useChatRepository()

	if (!chatId || !userId) return

	const { messages } = await getRemoteChatData(chatId)

	if (!messages || (messages && !Object.values(messages).length)) return

	const readedMessages = updateReadState(messages, userId)
	const updatedChatMessages = convertArrayMessagesToObjectMessages(readedMessages)

	return updateChatMessages(chatId, updatedChatMessages)
}

function updateReadState(messages: MessageObjects, ownerUserId: Id) { // REFACTOR rule
	return Object.entries(messages).map((message) => {
		if (message[1].owner !== ownerUserId) {
			return { [message[0]]: { ...message[1], readed: true, metadata: {} } }
		}
		return { [message[0]]: { ...message[1] } }
	})
}

function convertArrayMessagesToObjectMessages(array: MessageObjects[]) {
	return array.reduce((total, current) => {
		return { ...total, ...current }
	}, {})
}

export { makeAllUserMessagesAsReadDM }
