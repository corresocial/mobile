import { ref, set } from 'firebase/database'

import { UserDatabase } from '@globalTypes/chat/types'

import { Id } from '../types'

import { realTimeDatabase } from '..'

import { getRemoteUser } from './getRemoteUser'

async function unblockUserId(targetUserId: Id, loggedUserId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${loggedUserId}/blockedUsers`)

	const user: UserDatabase = await getRemoteUser(loggedUserId)
	const filteredBlockedUsers = user.blockedUsers.filter((id) => id !== targetUserId)

	set(realTimeDatabaseRef, [...filteredBlockedUsers])

	return true
}

export { unblockUserId }
