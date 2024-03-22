import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/chat/gatewayAdapter/ChatGatewayAdapter'

import { updateMessagesCanViewedByUser } from '../rules/userCanViewMessages'

async function cleanChatMessagesUC(chatId: Id, userIdCanView: Id) {
	const { getRemoteChatData, setChatMessages, updateChatMessages } = ChatGatewayAdapter()

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

export { cleanChatMessagesUC }
