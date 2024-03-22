import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '@services/firebase'

async function userExists(userId: string) {
	try {
		const userRef = doc(firestore, 'users', userId)
		const userSnap = await getDoc(userRef)

		return userSnap.exists()
	} catch (error) {
		console.log(error)
		return false
	}
}

export { userExists }
