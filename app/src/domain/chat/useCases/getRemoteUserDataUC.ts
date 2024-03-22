import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/chat/gatewayAdapter/ChatGatewayAdapter'

async function getRemoteUserDataUC(userId: Id) {
	const { getRemoteUserData } = ChatGatewayAdapter()
	return getRemoteUserData(userId)
}

export { getRemoteUserDataUC }
