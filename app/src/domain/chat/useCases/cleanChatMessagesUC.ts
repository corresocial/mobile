import { MessageObjects } from '@domain/entities/chat/types'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function cleanChatMessagesUC(chatId: Id, userIdCanView: Id) {
	const { getRemoteChatData, updateChatMessages } = ChatGatewayAdapter()

	const { messages: chatMessages } = await getRemoteChatData(chatId)

	const removedForSingleUser = updateUserViewValue(chatMessages, userIdCanView)
	const updatedChatMessages = convertArrayMessagesToObjectMessages(removedForSingleUser)

	updateChatMessages(chatId, updatedChatMessages)
}

function updateUserViewValue(messages: MessageObjects, userIdCanView: Id): MessageObjects[] { // TODO rule
	const updatedMessages = Object.entries(messages).map((message) => {
		if (!message[1].userCanView) {
			return { [message[0]]: { ...message[1], userCanView: userIdCanView } }
		}
		if (message[1].userCanView !== userIdCanView) {
			return false
		}
		return message
	})

	return updatedMessages.filter((filteredMessage) => filteredMessage) as any // TODO Type
}

function convertArrayMessagesToObjectMessages(array: MessageObjects[]) {
	return array.reduce((total, current) => {
		return { ...total, ...current }
	}, {})
}

export { cleanChatMessagesUC }
