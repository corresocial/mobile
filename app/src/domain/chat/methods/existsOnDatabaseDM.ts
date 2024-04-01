import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function existsOnDatabaseDM(nodeId?: Id) {
	const { existsOnDatabase } = useChatRepository()
	return existsOnDatabase(nodeId)
}

export { existsOnDatabaseDM }
