import { deleteDoc, doc } from 'firebase/firestore'

import { firestore } from '..'

async function deleteUserData(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId)
		const docPrivateRef = doc(firestore, 'users', userId, 'private', 'contacts')

		await deleteDoc(docRef)
		await deleteDoc(docPrivateRef)
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

export { deleteUserData }
