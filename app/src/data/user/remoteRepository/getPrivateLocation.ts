import { doc, getDoc } from 'firebase/firestore'

import { PrivateUserCollection } from '@services/firebase/types'

import { firestore } from '@services/firebase'

async function getPrivateLocation(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId, 'private', 'location')
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return { ...docSnap.data() as PrivateUserCollection['location'] }
		}
		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPrivateLocation }
