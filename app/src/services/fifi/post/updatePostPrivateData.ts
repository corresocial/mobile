import { doc, updateDoc, setDoc } from 'firebase/firestore'
import { firestore } from '..'

import { PostCollectionType, PrivateAddress } from '../types'

async function updatePostPrivateData(data: PrivateAddress, postId: string, postCollection: PostCollectionType, privateField: string = '') {
	try {
		try {
			const docRef = doc(firestore, postCollection, postId, 'private', privateField)
			await updateDoc(
				docRef,
				{
					...data
				}
			)
		} catch (err) {
			const collectionRef = doc(firestore, postCollection, postId, 'private', privateField)
			await setDoc(
				collectionRef,
				{
					...data
				},
			)
		}
	} catch (err) {
		console.log(err)
	}
}

export { updatePostPrivateData }
