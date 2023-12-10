import { Chat } from '@domain/entities/chat/types'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function registerNewChatUC(initialChatData: Partial<Chat>) {
	const { registerNewChat } = ChatGatewayAdapter()

	await registerNewChat(initialChatData)
}

export { registerNewChatUC }
