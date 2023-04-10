import { ref, set } from 'firebase/database'
import { Id } from '../types'
import { realTimeDatabase } from '..'
import { getRemoteUser } from './getRemoteUser'

async function blockUserId(targetUserId: Id, loggedUserId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${loggedUserId}/blockedUsers`)

	const { blockedUsers } = await getRemoteUser(loggedUserId)
	if (blockedUsers.includes(targetUserId)) return true

	set(realTimeDatabaseRef, [...blockedUsers, targetUserId])

	return true
}

export { blockUserId }
