import { UserEntityOptional } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function updateUserData(userId: string, data: UserEntityOptional, merge = true) {
	try {
		const docRef = firebaseFirestore.collection(USER_COLLECTION).doc(userId)

		const options = merge ? { merge: true } : {}
		const success = await docRef.set(
			{ ...data, updatedAt: new Date() },
			options
		)
			.then(() => true)
			.catch((err: any) => {
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
