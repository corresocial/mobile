import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function blockUserByIdDM(targetBlockUserId: Id, ownerBlockUserId: Id) {
	const { getRemoteUserData, updateBlockedUsersList } = useChatRepository()

	const userData = await getRemoteUserData(ownerBlockUserId)

	if ((userData?.blockedUsers || []).includes(targetBlockUserId)) return true

	return updateBlockedUsersList(ownerBlockUserId, [...(userData?.blockedUsers || []), targetBlockUserId])
}

export { blockUserByIdDM }
