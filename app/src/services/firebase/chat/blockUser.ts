import { ref, set } from 'firebase/database'
import { Id } from '../types'
import { realTimeDatabase } from '..'
import { getRemoteUser } from './getRemoteUser'

async function blockUserId(blockedUserId: Id, loggedUserId: Id) {
	const realTimeDatabaseRef = ref(realTimeDatabase, `${loggedUserId}/blockedUsers`)

	const { blockedUsers } = await getRemoteUser(loggedUserId)
	if (blockedUsers.includes(blockedUserId)) return true

	set(realTimeDatabaseRef, [...blockedUsers, blockedUserId])

	return true
}

export { blockUserId }
