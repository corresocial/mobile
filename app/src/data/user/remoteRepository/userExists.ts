import { doc, getDoc } from '@react-native-firebase/firestore'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function userExists(userId: string) {
	try {
		const userRef = doc(firebaseFirestore, USER_COLLECTION, userId)
		const userSnap = await getDoc(userRef)
		return userSnap.exists()
	} catch (error) {
		console.log(error)
		return false
	}
}

export { userExists }
