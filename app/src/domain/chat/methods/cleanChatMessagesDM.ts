import { MessageObjects } from '@domain/chat/entity/types'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

import { updateMessagesCanViewedByUser } from '../core/userCanViewMessages'

async function cleanChatMessagesDM(chatId: Id, userIdCanView: Id) {
	const { getRemoteChatData, setChatMessages, updateChatMessages } = useChatRepository()

	const { messages: chatMessages } = await getRemoteChatData(chatId)

	const removedForSingleUser = updateMessagesCanViewedByUser(chatMessages, userIdCanView)
	const filteredMessages = filterInvalidMessages(removedForSingleUser)
	const updatedChatMessages = convertArrayMessagesToObjectMessages(filteredMessages)

	if (Object.keys(updatedChatMessages).length === Object.keys(chatMessages).length) {
		return updateChatMessages(chatId, updatedChatMessages)
	}

	setChatMessages(chatId, updatedChatMessages)
}

function convertArrayMessagesToObjectMessages(array: MessageObjects[]) {
	return array.reduce((total, current) => {
		return { ...total, ...current }
	}, {})
}

function filterInvalidMessages(messages: MessageObjects[]) {
	return messages.filter((filteredMessage) => filteredMessage) as MessageObjects[]
}

export { cleanChatMessagesDM }
