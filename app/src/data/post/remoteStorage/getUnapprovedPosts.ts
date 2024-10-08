import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getUnapprovedPosts(maxDocs = 1, lastDoc: PostEntity | null = null) {
	try {
		let unapprovedPostsQuery

		if (lastDoc) {
			unapprovedPostsQuery = firebaseFirestore
				.collection(POST_COLLECTION)
				.where('unapprovedData.updatedAt', '!=', false)
				.orderBy('unapprovedData.updatedAt', 'desc')
				.limit(maxDocs)
				.startAfter(lastDoc.updatedAt)
		} else {
			unapprovedPostsQuery = firebaseFirestore
				.collection(POST_COLLECTION)
				.where('unapprovedData.updatedAt', '!=', false)
				.orderBy('unapprovedData.updatedAt', 'desc')
				.limit(maxDocs)
		}

		const postsSnap = await unapprovedPostsQuery.get()
		const posts = postsSnap.docs.map((doc) => ({ postId: doc.id, ...doc.data() } as PostEntity))
		const filteredPosts = posts.filter(
			(post) => post.unapprovedData && (post.unapprovedData as any).reject !== true
		)

		return filteredPosts
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os posts não aprovados')
	}
}
