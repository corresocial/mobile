import { usePostRepository } from '@data/post/usePostRepository'

import { PostRangeLocation, updatePostsLocation, updatePostsRange } from '../core/updatePostsLocation'

async function updateLocationDataOnPostsDM(userId: string, newPostRangeLocation: PostRangeLocation, subscriptionDowngrade?: boolean) {
	try {
		const { remoteStorage } = usePostRepository()

		if (!userId) {
			throw new Error('Não foi possível identificar o usuário')
		}

		// REFACTOR Buscar somente os que forem direrente dos parâmetros de entrada para necessitar de menos posts
		const userPosts = await remoteStorage.getPostsByUser(userId, 1, null, false, true)

		if (!userPosts || (userPosts && !userPosts.length)) {
			throw new Error('Usuário não outros posts')
		}

		let updatedUserPosts = await updatePostsLocation(userPosts, newPostRangeLocation)
		if (subscriptionDowngrade) {
			updatedUserPosts = await updatePostsRange(updatedUserPosts, newPostRangeLocation)
		}

		await remoteStorage.updatePostsList(updatedUserPosts)
		return updatedUserPosts
	} catch (error) {
		console.log(error)
		return []
	}
}

export { updateLocationDataOnPostsDM }
