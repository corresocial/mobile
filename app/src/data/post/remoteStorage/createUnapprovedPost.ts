import { addDoc, collection } from 'firebase/firestore'

import { PostEntityOptional } from '@domain/post/entity/types'

import { UNAPPROVED_POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createUnapprovedPost(post: PostEntityOptional) {
	try {
		const collectionRef = collection(firestore, UNAPPROVED_POST_COLLECTION)

		const postData = { ...post }
		await addDoc(collectionRef, postData)
	} catch (error) {
		console.log(error)
	}
}

export { createUnapprovedPost }
