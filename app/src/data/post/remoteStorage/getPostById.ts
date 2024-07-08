import { doc, getDoc } from 'firebase/firestore'

import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getPostById(postId: string) {
	try {
		const postRef = doc(firestore, POST_COLLECTION, postId)
		const postSnap = await getDoc(postRef)

		if (postSnap.exists()) {
			return { postId, ...postSnap.data() } as PostEntity
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPostById }
