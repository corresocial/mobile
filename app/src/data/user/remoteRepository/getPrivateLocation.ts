import { doc, getDoc } from 'firebase/firestore'

import { PrivateUserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getPrivateLocation(userId: string) {
	try {
		const docRef = doc(firestore, USER_COLLECTION, userId, 'private', 'location')
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return { ...docSnap.data() as PrivateUserEntity['location'] }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPrivateLocation }
