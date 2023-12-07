import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function existsOnDatabaseUC(nodeId?: Id) {
	const { existsOnDatabase } = ChatGatewayAdapter()
	return existsOnDatabase(nodeId)
}

export { existsOnDatabaseUC }
