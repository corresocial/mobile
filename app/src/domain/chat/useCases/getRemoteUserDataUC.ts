import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/gatewayAdapters/ChatGatewayAdapter'

async function getRemoteUserDataUC(userId: Id) {
	const { getRemoteUserData } = ChatGatewayAdapter()
	return getRemoteUserData(userId)
}

export { getRemoteUserDataUC }
