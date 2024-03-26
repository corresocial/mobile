import { deleteDoc, doc } from 'firebase/firestore'

import { firestore } from '@infrastructure/firebase/index'

async function deleteUserData(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId)
		const privateContactsDoc = doc(firestore, 'users', userId, 'private', 'contacts')
		const privateLocationDoc = doc(firestore, 'users', userId, 'private', 'location')

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
