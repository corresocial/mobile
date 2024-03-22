import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function existsOnDatabaseUC(nodeId?: Id) {
	const { existsOnDatabase } = useChatRepository()
	return existsOnDatabase(nodeId)
}

export { existsOnDatabaseUC }
