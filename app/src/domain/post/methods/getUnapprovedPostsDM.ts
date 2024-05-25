import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

import { UiUtils } from '@utils-ui/common/UiUtils'

const { getNewDate } = UiUtils()

async function getUnapprovedPostsDM(usePostRepository: () => PostRepositoryInterface, pageSize?: number, lastPost?: PostEntity | any) {
	try {
		const { remoteStorage } = usePostRepository()

		const lastPostData = lastPost ? { ...lastPost, createdAt: getNewDate(lastPost.createdAt) } : null
		return remoteStorage.getUnapprovedPosts(pageSize, lastPostData)
	} catch (error) {
		console.log(error)
	}
}

export { getUnapprovedPostsDM }
