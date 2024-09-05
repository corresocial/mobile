import { UserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getUserData(userId: string) {
	try {
		const userRef = firebaseFirestore.collection(USER_COLLECTION).doc(userId)
		const userSnap = await userRef.get()
		if (userSnap.exists) {
			return { ...userSnap.data() as UserEntity, userId: userSnap.id }
		}
		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getUserData }
