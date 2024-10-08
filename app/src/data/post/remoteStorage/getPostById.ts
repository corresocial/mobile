import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPostById(postId: string) {
	try {
		const postSnap = await firebaseFirestore
			.collection(POST_COLLECTION)
			.doc(postId)
			.get()

		if (postSnap.exists) {
			return { postId, ...postSnap.data() } as PostEntity
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPostById }
