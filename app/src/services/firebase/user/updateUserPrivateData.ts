import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { firestore } from '..'

import { PrivateUserCollection } from '../types'

async function updateUserPrivateData(data: PrivateUserCollection, userId: string, privateField: string = '') {
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
