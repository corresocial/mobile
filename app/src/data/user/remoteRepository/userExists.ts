import { doc, getDoc } from 'firebase/firestore'

import { USER_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function userExists(userId: string) {
	try {
		const userRef = doc(firestore, USER_COLLECTION, userId)
		const userSnap = await getDoc(userRef)

		return userSnap.exists()
	} catch (error) {
		console.log(error)
		return false
	}
}

export { userExists }
