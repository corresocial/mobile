import { Chat } from '@domain/chat/entity/types'

import { useChatRepository } from '@data/chat/useChatRepository'

async function registerNewChatUC(initialChatData: Partial<Chat>) {
	const { registerNewChat } = useChatRepository()

	await registerNewChat(initialChatData)
}

export { registerNewChatUC }
