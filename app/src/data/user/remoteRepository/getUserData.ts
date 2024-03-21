import { doc, getDoc } from 'firebase/firestore'

import { UserCollection } from '@services/firebase/types'

import { firestore } from '@services/firebase'

async function getUserData(userId: string) { // BEFORE getUser
	try {
		const userRef = doc(firestore, 'users', userId)
		const userSnap = await getDoc(userRef)

		if (userSnap.exists()) {
			return { userId, ...userSnap.data() as UserCollection }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getUserData }
