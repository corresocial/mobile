import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '@services/firebase'

async function getPrivateLocation(userId: string) {
	try {
		const docRef = doc(firestore, 'users', userId, 'private', 'location')
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

export { getPrivateLocation }
