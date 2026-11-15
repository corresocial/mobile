import { doc, getDoc } from '@react-native-firebase/firestore'

import { UserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getUserData(userId: string) {
	try {
		const userRef = doc(firebaseFirestore, USER_COLLECTION, userId)
		const userSnap = await getDoc(userRef)
		if (userSnap.exists()) {
			return { ...userSnap.data() as UserEntity, userId: userSnap.id }
		}
		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getUserData }
