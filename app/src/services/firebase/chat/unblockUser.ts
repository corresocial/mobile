import { ref, set } from 'firebase/database'

import { Id } from '../types'
import { UserDatabase } from '@globalTypes/chat/types'

import { realTimeDatabase } from '@services/firebase'

import { getRemoteUser } from './getRemoteUser'

async function unblockUserId(targetUserId: Id, loggedUserId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${loggedUserId}/blockedUsers`)

	const user: UserDatabase = await getRemoteUser(loggedUserId)
	const filteredBlockedUsers = user.blockedUsers.filter((id) => id !== targetUserId)

	set(realTimeDatabaseRef, [...filteredBlockedUsers])

	return true
}

export { unblockUserId }
