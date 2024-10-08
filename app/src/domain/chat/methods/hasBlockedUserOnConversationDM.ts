import { Id } from '@domain/globalTypes'

import { useChatRepository } from '@data/chat/useChatRepository'

import { CheckBlockedUsersResponse } from '../entity/types'

async function hasBlockedUserOnConversationDM(userId1: Id, userId2: Id): Promise<CheckBlockedUsersResponse> {
	const { getRemoteUserData } = useChatRepository()

	if (!userId1 || !userId2) return { hasUserBlocked: false, userBlockOwnerId: '' }

	const userData1 = await getRemoteUserData(userId1)
	const userData2 = await getRemoteUserData(userId2)
	const blockedUsers = [userData1?.blockedUsers, ...(userData2?.blockedUsers || [])]

	const hasUserBlocked = blockedUsers.includes(userId1) || blockedUsers.includes(userId2)
	const userBlockOwnerId = (userData1?.blockedUsers || []).includes(userId2) ? userId1 : userId2

	return { hasUserBlocked, userBlockOwnerId }
}

export { hasBlockedUserOnConversationDM }
