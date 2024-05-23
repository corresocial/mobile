import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntityOptional } from '../entity/types'

async function saveUnapprovedPostDM(usePostRepository: () => PostRepositoryInterface, postData: PostEntityOptional) {
	try {
		const { remoteStorage } = usePostRepository()
		return remoteStorage.createUnapprovedPost(postData)
	} catch (error) {
		console.log(error)
	}
}

export { saveUnapprovedPostDM }
