import { PostEntity, PostEntityOptional } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPost(post: PostEntityOptional) {
	try {
		const postData = { ...post, createdAt: new Date() }

		const docRef = await firebaseFirestore
			.collection(POST_COLLECTION)
			.add(postData)

		return { ...postData, postId: docRef.id } as PostEntity
	} catch (error) {
		console.log(error)
		return null
	}
}

export { createPost }
