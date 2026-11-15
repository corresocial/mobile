import { doc, getDoc } from '@react-native-firebase/firestore'

import { PrivateUserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

async function getPrivateContacts(userId: string) {
	try {
		const docRef = doc(firebaseFirestore, USER_COLLECTION, userId, 'private', 'contacts')

		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return { ...docSnap.data() as PrivateUserEntity['contacts'] }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPrivateContacts }
