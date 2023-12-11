import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

import { updateMessagesCanViewedByUser } from '../rules/userCanViewMessages'

async function cleanChatMessagesUC(chatId: Id, userIdCanView: Id) {
	const { getRemoteChatData, updateChatMessages } = ChatGatewayAdapter()

	const { messages: chatMessages } = await getRemoteChatData(chatId)

	const removedForSingleUser = updateMessagesCanViewedByUser(chatMessages, userIdCanView)
	const filteredMessages = filterInvalidMessages(removedForSingleUser)
	const updatedChatMessages = convertArrayMessagesToObjectMessages(filteredMessages)

	updateChatMessages(chatId, updatedChatMessages)
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
