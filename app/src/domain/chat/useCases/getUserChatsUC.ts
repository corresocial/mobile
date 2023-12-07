import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function getUserChatsUC(chatIds: Id[]) {
	const { getUserChats } = ChatGatewayAdapter()
	return getUserChats(chatIds)
}

export { getUserChatsUC }
