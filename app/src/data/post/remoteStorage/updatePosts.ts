import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function updatePostsList(userPosts: PostEntity[]) {
	try {
		if (!userPosts || !userPosts.length) {
			throw new Error('Essas postagens não podem ser atualizadas sem um identificador de usuário')
		}

		const batchSize = 500
		const batches = []

		for (let i = 0; i < userPosts.length; i += batchSize) {
			const batchIds = userPosts.slice(i, i + batchSize)
			const batch = firebaseFirestore.batch()
			batchIds.forEach((currentPost) => {
				const ref = firebaseFirestore.collection(POST_COLLECTION).doc(currentPost.postId)
				batch.update(ref, {
					...currentPost,
					updatedAt: new Date(),
				})
			})
			batches.push(batch.commit())
		}

		await Promise.all(batches)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updatePostsList }
