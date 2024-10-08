import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateBlockedUsersList(userId: Id, blockedUserIds: Id[]): Promise<boolean> {
	try {
		const realTimeDatabaseRef = firebaseDatabase.ref(`${userId}/blockedUsers`)
		await realTimeDatabaseRef.set(blockedUserIds)
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export { updateBlockedUsersList }
