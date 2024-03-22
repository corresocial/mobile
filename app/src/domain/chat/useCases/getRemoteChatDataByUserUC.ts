import { ChatUserIdentification } from '@domain/entities/chat/types'

import { ChatGatewayAdapter } from '@data/chat/gatewayAdapter/ChatGatewayAdapter'

import { generateNewChatIds } from '../rules/generateNewChatIds'

async function getRemoteChatDataByUserUC(user1: ChatUserIdentification, user2: ChatUserIdentification) {
	const { existsOnDatabase, getRemoteChatData } = ChatGatewayAdapter()

	const { chatId1, chatId2 } = generateNewChatIds(user1, user2)

	if (await existsOnDatabase(chatId1)) {
		const remoteChat = await getRemoteChatData(chatId1)
		return remoteChat
	}

	if (await existsOnDatabase(chatId2)) {
		const remoteChat = await getRemoteChatData(chatId2)
		return remoteChat
	}

	return { chatId: chatId1, user1, user2, messages: {} }
}

export { getRemoteChatDataByUserUC }
