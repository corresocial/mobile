import { doc, getDoc } from 'firebase/firestore'

import { PrivateUserEntity } from '@domain/user/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function getPrivateContacts(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId, 'private', 'contacts')
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return { ...docSnap.data() as PrivateUserEntity['contacts'] }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPrivateContacts }
