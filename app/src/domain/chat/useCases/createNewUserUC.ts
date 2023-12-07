import { initialUserDataStructure } from '@domain/entities/chat'
import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function createNewUserUC(userId: Id) {
	const { registerNewUser } = ChatGatewayAdapter()
	return registerNewUser(userId, initialUserDataStructure)
}

export { createNewUserUC }
