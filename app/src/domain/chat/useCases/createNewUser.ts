import { ChatGatewayAdapter } from "@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter"
import { initialUserDataStructure } from "@domain/entities/chat"
import { Id } from "@domain/entities/globalTypes"

async function createNewUserUC(userId: Id) {
	const { registerNewUser } = ChatGatewayAdapter()
	return registerNewUser(userId, initialUserDataStructure)
}

export { createNewUserUC }
