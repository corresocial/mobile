import { Id } from '@domain/entities/globalTypes'

import { ChatGatewayAdapter } from '@data/chat/gatewayAdapter/ChatGatewayAdapter'

async function unblockUserByIdUC(targetBlockUserId: Id, ownerBlockUserId: Id) {
	const { getRemoteUserData, updateBlockedUsersList } = ChatGatewayAdapter()

	const { blockedUsers } = await getRemoteUserData(ownerBlockUserId)
	const filteredBlockedUsers = blockedUsers.filter((id) => id !== targetBlockUserId)

	return updateBlockedUsersList(ownerBlockUserId, filteredBlockedUsers)
}

export { unblockUserByIdUC }
