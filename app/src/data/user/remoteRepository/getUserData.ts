import { doc, getDoc } from 'firebase/firestore'

import { UserEntity } from '@domain/user/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function getUserData(userId: string) { // BEFORE getUser
	try {
		const userRef = doc(firestore, 'users', userId)
		const userSnap = await getDoc(userRef)

		if (userSnap.exists()) {
			return { ...userSnap.data() as UserEntity, userId }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getUserData }
