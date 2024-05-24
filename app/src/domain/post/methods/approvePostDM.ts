import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { mergeUnapprovedDataOnPostDM } from '../core/mergeUnapprovedDataOnPostDM'

async function approvePostDM(usePostRepository: () => PostRepositoryInterface, postData: PostEntity) {
	try {
		const { remoteStorage } = usePostRepository()

		const newPostData = mergeUnapprovedDataOnPostDM(postData)
		console.log(newPostData)
		return newPostData
		// return remoteStorage.updatePostData(postData.postId, newPostData)
	} catch (error) {
		console.log(error)
	}
}

export { approvePostDM }
