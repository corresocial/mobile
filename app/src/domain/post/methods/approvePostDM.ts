import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { mergeUnapprovedDataOnPostDM } from '../core/mergeUnapprovedDataOnPostDM'

async function approvePostDM(usePostRepository: () => PostRepositoryInterface, postData: PostEntity) {
	try {
		const { remoteStorage } = usePostRepository()

		const newPostData = mergeUnapprovedDataOnPostDM(postData)
		await remoteStorage.updatePostData(postData.postId, newPostData, false)

		const storedPicturesUrl = postData.picturesUrl || []
		const picturesAlreadyUploadedToRemove = storedPicturesUrl.filter(
			(pictureUrl) => (newPostData && newPostData.picturesUrl && !newPostData.picturesUrl.includes(pictureUrl))
				|| (newPostData.unapprovedData?.picturesUrl && !newPostData.unapprovedData?.picturesUrl.includes(pictureUrl))
		)
		console.log(picturesAlreadyUploadedToRemove)
		if (picturesAlreadyUploadedToRemove.length) {
			await remoteStorage.deletePostMedias(picturesAlreadyUploadedToRemove, 'pictures')
		}

		const storedVideosUrl = postData.picturesUrl || []
		const videosAlreadyUploadedToRemove = storedVideosUrl.filter(
			(pictureUrl) => (newPostData && newPostData.picturesUrl && !newPostData.picturesUrl.includes(pictureUrl))
				|| (newPostData.unapprovedData?.picturesUrl && !newPostData.unapprovedData?.picturesUrl.includes(pictureUrl))
		)
		console.log(videosAlreadyUploadedToRemove)
		if (videosAlreadyUploadedToRemove.length) {
			await remoteStorage.deletePostMedias(videosAlreadyUploadedToRemove, 'videos')
		}

		return newPostData
	} catch (error) {
		console.log(error)
	}
}

export { approvePostDM }
