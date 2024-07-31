import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

async function updatePostPresenceList(usePostRepository: () => PostRepositoryInterface, postData: PostEntity, userId: string): Promise<PostEntity | undefined> {
	try {
		const { remoteStorage } = usePostRepository()

		const setNewPresenceList = (): PostEntity => {
			if (postData.presenceList?.includes(userId)) {
				console.log('existe')
				return { ...postData, presenceList: postData.presenceList?.filter((id) => id !== userId) }
			}
			console.log('não existe')
			return { ...postData, presenceList: [...postData.presenceList ?? [], userId] }
		}

		const newPostData = setNewPresenceList()

		await remoteStorage.updatePostData(postData.postId, newPostData)
		return newPostData
	} catch (e) {
		console.log(e)
	}
	return undefined
}

export { updatePostPresenceList }
