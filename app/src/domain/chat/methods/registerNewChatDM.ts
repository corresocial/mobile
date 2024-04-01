import { Chat } from '@domain/chat/entity/types'

import { useChatRepository } from '@data/chat/useChatRepository'

async function registerNewChatDM(initialChatData: Partial<Chat>) {
	const { registerNewChat } = useChatRepository()

	await registerNewChat(initialChatData)
}

export { registerNewChatDM }
