import { initialUserDataStructure } from '@domain/chat/entity'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function createNewUserUC(userId: Id) {
	const { registerNewUser } = useChatRepository()
	return registerNewUser(userId, initialUserDataStructure)
}

export { createNewUserUC }
