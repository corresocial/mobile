import { initialUserDataStructure } from '@domain/chat/entity'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function createNewUserDM(userId: Id) {
	const { registerNewUser } = useChatRepository()
	return registerNewUser(userId, initialUserDataStructure)
}

export { createNewUserDM }
