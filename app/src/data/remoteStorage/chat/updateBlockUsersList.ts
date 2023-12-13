import { ref, set } from 'firebase/database'

import { Id } from '@domain/entities/globalTypes'

import { realTimeDatabase } from '@services/firebase'

async function updateBlockedUsersList(userId: Id, blockedUserIds: Id[]) {
	try {
		const realTimeDatabaseRef = ref(realTimeDatabase, `${userId}/blockedUsers`)

		await set(realTimeDatabaseRef, blockedUserIds)
		return true
	} catch (err) {
		console.log(err)
		return false
	}
}

export { updateBlockedUsersList }
