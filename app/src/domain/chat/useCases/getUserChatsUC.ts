import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

async function getUserChatsUC(chatIds: Id[]) {
	const { getUserChats } = ChatGatewayAdapter()
	return getUserChats(chatIds)
}

export { getUserChatsUC }
