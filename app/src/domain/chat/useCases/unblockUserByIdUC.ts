import { Id } from '@domain/entities/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function unblockUserByIdUC(targetBlockUserId: Id, ownerBlockUserId: Id) {
	const { getRemoteUserData, updateBlockedUsersList } = useChatRepository()

	const { blockedUsers } = await getRemoteUserData(ownerBlockUserId)
	const filteredBlockedUsers = blockedUsers.filter((id) => id !== targetBlockUserId)

	return updateBlockedUsersList(ownerBlockUserId, filteredBlockedUsers)
}

export { unblockUserByIdUC }
