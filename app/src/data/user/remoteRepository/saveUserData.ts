import { doc, setDoc } from '@react-native-firebase/firestore'

import { UserEntityOptional } from '@domain/user/entity/types'

import { USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase'

async function saveUserData(userId: string, data: UserEntityOptional) {
	try {
		const docRef = doc(firebaseFirestore, USER_COLLECTION, userId)
		await setDoc(docRef, { ...data, createdAt: new Date() })
	} catch (error) {
		console.log(error)
		throw error
	}
}

export { saveUserData }
