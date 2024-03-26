import { ChatUserIdentification } from '@domain/chat/entity/types'

function generateNewChatIds(user1: ChatUserIdentification, user2: ChatUserIdentification) {
	const userId1 = user1.userId
	const userId2 = user2.userId

	const chatId1 = `${userId1}-${userId2}`
	const chatId2 = `${userId2}-${userId1}`
	return { chatId1, chatId2 }
}

export { generateNewChatIds }
