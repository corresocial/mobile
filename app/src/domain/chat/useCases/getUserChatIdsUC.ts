import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function getUserChatIdsUC(userId: Id) {
	const { getUserChatIds } = ChatGatewayAdapter()
	return getUserChatIds(userId)
}

export { getUserChatIdsUC }
