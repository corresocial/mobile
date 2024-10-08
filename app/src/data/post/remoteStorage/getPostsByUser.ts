import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getPostsByUser(userId: string, maxDocs = 10, lastDoc: PostEntity | null = null, completed = false, allPosts = false) {
	try {
		const collectionRef = firebaseFirestore.collection(POST_COLLECTION)
		let postsByUserQuery

		if (allPosts) {
			postsByUserQuery = collectionRef
				.where('owner.userId', '==', userId)
				.orderBy('createdAt', 'desc')
		} else if (lastDoc) {
			postsByUserQuery = collectionRef
				.where('completed', '==', completed)
				.where('owner.userId', '==', userId)
				.orderBy('createdAt', 'desc')
				.limit(maxDocs)
				.startAfter(lastDoc.createdAt)
		} else {
			postsByUserQuery = collectionRef
				.where('completed', '==', completed)
				.where('owner.userId', '==', userId)
				.orderBy('createdAt', 'desc')
				.limit(maxDocs)
		}

		const postsSnap = await postsByUserQuery.get()
		return postsSnap.docs.map((doc) => ({ postId: doc.id, ...doc.data() } as PostEntity))
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as postagens')
	}
}
