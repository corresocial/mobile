import { initialUserDataStructure } from '@domain/entities/chat'
import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function createNewUserUC(userId: Id) {
	const { registerNewUser } = useChatRepository()
	return registerNewUser(userId, initialUserDataStructure)
}

export { createNewUserUC }
