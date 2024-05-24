import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

async function getUnapprovedPostsDM(usePostRepository: () => PostRepositoryInterface, pageSize?: number, lastPost?: PostEntity | any) {
	try {
		const { remoteStorage } = usePostRepository()
		return remoteStorage.getUnapprovedPosts(pageSize, lastPost)
	} catch (error) {
		console.log(error)
	}
}

export { getUnapprovedPostsDM }
