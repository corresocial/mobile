import { doc, getDoc } from 'firebase/firestore'

import { UserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getUserData(userId: string) { // BEFORE getUser
	try {
		const userRef = doc(firestore, USER_COLLECTION, userId)
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
