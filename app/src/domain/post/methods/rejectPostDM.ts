import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

async function rejectPostDM(usePostRepository: () => PostRepositoryInterface, postData: PostEntity) {
	try {
		const { remoteStorage } = usePostRepository()

		await remoteStorage.updatePostData(postData.postId, { unapprovedData: { reject: true } })

		return postData
	} catch (error) {
		console.log(error)
	}
}

export { rejectPostDM }
