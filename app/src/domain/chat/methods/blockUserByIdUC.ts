import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function blockUserByIdUC(targetBlockUserId: Id, ownerBlockUserId: Id) {
	const { getRemoteUserData, updateBlockedUsersList } = useChatRepository()

	const { blockedUsers } = await getRemoteUserData(ownerBlockUserId)

	if (blockedUsers.includes(targetBlockUserId)) return true

	return updateBlockedUsersList(ownerBlockUserId, [...blockedUsers, targetBlockUserId])
}

export { blockUserByIdUC }
