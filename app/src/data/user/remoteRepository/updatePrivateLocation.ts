import { doc, updateDoc, setDoc } from 'firebase/firestore'

import { PrivateUserCollection } from '@services/firebase/types'

import { firestore } from '@services/firebase'

async function updatePrivateLocation(userId: string, data: PrivateUserCollection['location']) {
	try {
		try {
			const docRef = doc(firestore, 'users', userId, 'private', 'location')
			await updateDoc(docRef, { ...data })
		} catch (error) {
			console.log(error)

			const collectionRef = doc(firestore, 'users', userId, 'private', 'location')
			await setDoc(collectionRef, { ...data })
		}

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updatePrivateLocation }
