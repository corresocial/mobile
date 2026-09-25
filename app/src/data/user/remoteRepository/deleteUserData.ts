import { deleteDoc, doc } from '@react-native-firebase/firestore'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

async function deleteUserData(userId: string) {
	try {
		const docRef = doc(firebaseFirestore, USER_COLLECTION, userId)
		const privateContactsDoc = doc(firebaseFirestore, USER_COLLECTION, userId, 'private', 'contacts')

		const privateLocationDoc = doc(firebaseFirestore, USER_COLLECTION, userId, 'private', 'location')

		await deleteDoc(docRef)
		await deleteDoc(privateContactsDoc)
		await deleteDoc(privateLocationDoc)

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deleteUserData }
