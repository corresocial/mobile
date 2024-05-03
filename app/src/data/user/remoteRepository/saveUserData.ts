import { doc, setDoc } from 'firebase/firestore'

import { UserEntityOptional } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function saveUserData(userId: string, data: UserEntityOptional) {
	try {
		const docRef = doc(firestore, USER_COLLECTION, userId)
		await setDoc(docRef, { ...data, createdAt: new Date() })
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { saveUserData }
