import { doc, setDoc } from 'firebase/firestore'

import { UserEntityOptional } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function updateUserData(userId: string, data: UserEntityOptional) {
	try {
		const docRef = doc(firestore, USER_COLLECTION, userId)

		const success = await setDoc(
			docRef,
			{ ...data, updatedAt: new Date() },
			{ merge: true },
		)
			.then(() => true)
			.catch((err) => {
				console.log(err)
				return false
			})

		return success
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateUserData }
