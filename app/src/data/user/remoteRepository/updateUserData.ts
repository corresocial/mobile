import { doc, setDoc } from 'firebase/firestore'

import { UserEntity } from '@domain/user/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function updateUserData(userId: string, data: UserEntity) {
	try {
		const docRef = doc(firestore, 'users', userId)

		const success = await setDoc(
			docRef,
			{ ...data, updatedAt: new Date() },
			{ merge: true },
		)
			.then(() => true)
			.catch((err) => {
				console.log(err)
				return false
			})

		return success
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateUserData }
