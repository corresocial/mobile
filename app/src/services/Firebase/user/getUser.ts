import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '..'

import { UserCollection } from '../types'

async function getUser(userId: string) {
	try {
		const userRef = doc(firestore, 'users', userId)
		const userSnap = await getDoc(userRef)
		if (userSnap.exists()) {
			return {
				userId, ...userSnap.data() as UserCollection
			}
		}
		return null
	} catch (e) {
		console.log(e)
		return false
	}
}

export { getUser }
