import { CheckBlockedUsersResponse } from '@domain/chat/entity'
import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

async function hasBlockedUserOnConversationUC(userId1: Id, userId2: Id): Promise<CheckBlockedUsersResponse> {
	const { getRemoteUserData } = useChatRepository()

	if (!userId1 || !userId2) return { hasUserBlocked: false, userBlockOwnerId: '' }

	const { blockedUsers: blockedUsers1 } = await getRemoteUserData(userId1)
	const { blockedUsers: blockedUsers2 } = await getRemoteUserData(userId2)
	const blockedUsers = [...blockedUsers1, ...blockedUsers2]

	const hasUserBlocked = blockedUsers.includes(userId1) || blockedUsers.includes(userId2)
	const userBlockOwnerId = blockedUsers1.includes(userId2) ? userId1 : userId2

	return { hasUserBlocked, userBlockOwnerId }
}

export { hasBlockedUserOnConversationUC }
