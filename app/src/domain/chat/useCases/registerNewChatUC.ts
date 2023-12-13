import { Chat } from '@domain/entities/chat/types'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

async function registerNewChatUC(initialChatData: Partial<Chat>) {
	const { registerNewChat } = ChatGatewayAdapter()

	await registerNewChat(initialChatData)
}

export { registerNewChatUC }
