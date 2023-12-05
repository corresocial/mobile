import { ref, set } from 'firebase/database'

import { realTimeDatabase } from '@services/firebase'

import { getRemoteUser } from './getRemoteUser'

async function getAndUpdateUserToken(userId: string, tokenNotification: string | null) {
	const remoteUser = await getRemoteUser(userId)
	if (!remoteUser.tokenNotification || remoteUser.tokenNotification !== tokenNotification) {
		const newRemoteUser = { ...remoteUser, tokenNotification }
		const dbRef = ref(realTimeDatabase, `${userId}`)
		set(dbRef, newRemoteUser)
		return newRemoteUser
	}
	return remoteUser
}

export { getAndUpdateUserToken }
