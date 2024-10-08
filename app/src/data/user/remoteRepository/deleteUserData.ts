import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

async function deleteUserData(userId: string) {
	try {
		const docRef = firebaseFirestore.collection(USER_COLLECTION).doc(userId)
		const privateContactsDoc = firebaseFirestore
			.collection(USER_COLLECTION)
			.doc(userId)
			.collection('private')
			.doc('contacts')

		const privateLocationDoc = firebaseFirestore
			.collection(USER_COLLECTION)
			.doc(userId)
			.collection('private')
			.doc('location')

		await docRef.delete()
		await privateContactsDoc.delete()
		await privateLocationDoc.delete()

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deleteUserData }
