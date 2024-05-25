import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

async function getUnapprovedPostsDM(usePostRepository: () => PostRepositoryInterface, pageSize?: number, lastPost?: PostEntity | any) {
	try {
		const { remoteStorage } = usePostRepository()

		const lastPostData = lastPost ? { ...lastPost } : null
		return remoteStorage.getUnapprovedPosts(pageSize, lastPostData)
	} catch (error) {
		console.log(error)
	}
}

export { getUnapprovedPostsDM }
