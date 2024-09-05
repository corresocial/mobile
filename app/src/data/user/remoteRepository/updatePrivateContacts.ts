import { doc, updateDoc, setDoc } from '@react-native-firebase/firestore'

import { PrivateUserEntity } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

async function updatePrivateContacts(userId: string, data: PrivateUserEntity['contacts']) {
	try {
		const docRef = doc(firebaseFirestore, USER_COLLECTION, userId, 'private', 'contacts')
		try {
			await updateDoc(docRef, { ...data })
		} catch (error) {
			await setDoc(docRef, { ...data })
		}

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updatePrivateContacts }
