import { deleteDoc, doc } from 'firebase/firestore'

import { USER_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function deleteUserData(userId: string) {
	try {
		const docRef = doc(firestore, USER_COLLECTION, userId)
		const privateContactsDoc = doc(firestore, USER_COLLECTION, userId, 'private', 'contacts')
		const privateLocationDoc = doc(firestore, USER_COLLECTION, userId, 'private', 'location')

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
