import { PrivateUserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

async function getPrivateLocation(userId: string) {
	try {
		const docRef = firebaseFirestore
			.collection(USER_COLLECTION)
			.doc(userId)
			.collection('private')
			.doc('location')

		const docSnap = await docRef.get()

		if (docSnap.exists) {
			return { ...docSnap.data() as PrivateUserEntity['location'] }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPrivateLocation }
