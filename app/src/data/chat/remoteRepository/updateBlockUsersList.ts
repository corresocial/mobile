import { ref, set } from '@react-native-firebase/database'

import { Id } from '@domain/globalTypes'

import { firebaseDatabase } from '@infrastructure/firebase'

async function updateBlockedUsersList(userId: Id, blockedUserIds: Id[]): Promise<boolean> {
	try {
		const realTimeDatabaseRef = ref(firebaseDatabase, `${userId}/blockedUsers`)
		await set(realTimeDatabaseRef, blockedUserIds)
		return true
	} catch (err) {
		console.error(err)
		return false
	}
}

export { updateBlockedUsersList }
