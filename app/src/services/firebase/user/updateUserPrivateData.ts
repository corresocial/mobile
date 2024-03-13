import { doc, updateDoc, setDoc } from 'firebase/firestore'

import { PrivateUserCollection } from '../types'

import { firestore } from '@services/firebase'

async function updateUserPrivateData(data: any, userId: string, privateField: string = '') { // TODO Type
	try {
		try {
			const docRef = doc(firestore, 'users', userId, 'private', privateField)
			await updateDoc(docRef, {
				...data
			})
		} catch (err) {
			const collectionRef = doc(firestore, 'users', userId, 'private', privateField)
			await setDoc(collectionRef, {
				...data
			},)
		}
	} catch (err) {
		console.log(err)
	}
}

export { updateUserPrivateData }
