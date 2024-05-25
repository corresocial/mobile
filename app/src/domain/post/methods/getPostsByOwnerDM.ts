import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

async function getPostsByOwnerDM(usePostRepository: () => PostRepositoryInterface, userId: string, pageSize?: number, lastPost?: PostEntity) {
	try {
		const { remoteStorage } = usePostRepository()

		return remoteStorage.getPostsByUser(userId, pageSize, lastPost)
	} catch (error) {
		console.log(error)
		return [] as PostEntity[]
	}
}

export { getPostsByOwnerDM }
