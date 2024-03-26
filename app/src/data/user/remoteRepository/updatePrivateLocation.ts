import { doc, updateDoc, setDoc } from 'firebase/firestore'

import { PrivateUserEntity } from '@domain/user/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function updatePrivateLocation(userId: string, data: PrivateUserEntity['location']) {
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
