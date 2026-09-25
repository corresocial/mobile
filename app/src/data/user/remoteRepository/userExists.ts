import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function userExists(userId: string) {
	try {
		const userRef = firebaseFirestore.collection(USER_COLLECTION).doc(userId)
		const userSnap = await userRef.get()
		return userSnap.exists()
	} catch (error) {
		console.log(error)
		return false
	}
}

export { userExists }
