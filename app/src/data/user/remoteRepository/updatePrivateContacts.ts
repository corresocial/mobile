import { doc, updateDoc, setDoc } from 'firebase/firestore'

import { PrivateUserCollection } from '@services/firebase/types'

import { firestore } from '@services/firebase'

async function updatePrivateContacts(userId: string, data: PrivateUserCollection['contacts']) {
	try {
		try {
			const docRef = doc(firestore, 'users', userId, 'private', 'contacts')
			await updateDoc(docRef, { ...data })
		} catch (error) {
			console.log(error)

			const collectionRef = doc(firestore, 'users', userId, 'private', 'contacts')
			await setDoc(collectionRef, { ...data })
		}

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updatePrivateContacts }
