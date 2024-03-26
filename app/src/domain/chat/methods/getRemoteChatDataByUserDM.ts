import { ChatUserIdentification } from '@domain/chat/entity/types'

import { useChatRepository } from '@data/chat/useChatRepository'

import { generateNewChatIds } from '../core/generateNewChatIds'

async function getRemoteChatDataByUserDM(user1: ChatUserIdentification, user2: ChatUserIdentification) {
	const { existsOnDatabase, getRemoteChatData } = useChatRepository()

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

export { getRemoteChatDataByUserDM }
