import { doc, writeBatch } from 'firebase/firestore'

import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase'

async function updatePostsList(userPosts: PostEntity[]) {
	try {
		try {
			if (!userPosts) return true

			if (!userPosts || (userPosts && !userPosts.length)) throw new Error('Essas postagens não podem ser atualizadas sem um identificador de usuário')

			const BATCH_SIZE = 500
			const batches = []

			for (let i = 0; i < userPosts.length; i += BATCH_SIZE) {
				const batchIds = userPosts.slice(i, i + BATCH_SIZE)
				const batch = writeBatch(firestore)
				batchIds.forEach((currentPost) => {
					const ref = doc(firestore, POST_COLLECTION, currentPost.postId)
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
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updatePostsList }
