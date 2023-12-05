import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '@services/firebase'

async function getPrivateContacts(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId, 'private', 'contacts')
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return {
				...docSnap.data() as any
			}
		}
		return null
	} catch (e) {
		console.log(e)
		return false
	}
}

export { getPrivateContacts }
