import { addDoc, collection } from 'firebase/firestore'

import { PostEntity, PostEntityOptional } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPost(post: PostEntityOptional) {
	try {
		const collectionRef = collection(firestore, POST_COLLECTION)

		const postData = { ...post, createdAt: new Date() }

		const docRef = await addDoc(collectionRef, postData)

		return { ...postData, postId: docRef.id } as PostEntity
	} catch (error) {
		console.log(error)
		return null
	}
}

export { createPost }
