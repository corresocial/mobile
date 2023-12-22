import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/remoteStorage/chat/gatewayAdapter/ChatGatewayAdapter'

async function blockUserByIdUC(targetBlockUserId: Id, ownerBlockUserId: Id) {
	const { getRemoteUserData, updateBlockedUsersList } = ChatGatewayAdapter()

	const { blockedUsers } = await getRemoteUserData(ownerBlockUserId)

	if (blockedUsers.includes(targetBlockUserId)) return true

	return updateBlockedUsersList(ownerBlockUserId, [...blockedUsers, targetBlockUserId])
}

export { blockUserByIdUC }
