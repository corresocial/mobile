import { doc, getDoc } from 'firebase/firestore'

import { PrivateUserCollection } from '@services/firebase/types'

import { firestore } from '@infrastructure/firebase/index'

async function getPrivateContacts(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId, 'private', 'contacts')
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return { ...docSnap.data() as PrivateUserCollection['contacts'] }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPrivateContacts }
