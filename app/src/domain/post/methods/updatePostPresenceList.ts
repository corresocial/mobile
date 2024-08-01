import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'

import { PostEntity } from '../entity/types'

async function updatePostPresenceList(usePostRepository: () => PostRepositoryInterface, postId: string, userId: string): Promise<PostEntity | null> {
	try {
		const { remoteStorage } = usePostRepository()

		const postData = await remoteStorage.getPostById(postId)
		if (!postData) return null

		const setNewPresenceList = (): PostEntity => {
			let newPresenceList = postData.presenceList ?? []
			if (newPresenceList.includes(userId)) {
				newPresenceList = newPresenceList.filter((id) => id !== userId)
			} else {
				newPresenceList.push(userId)
			}
			return { ...postData, presenceList: newPresenceList } as PostEntity
		}

		const newPostData = setNewPresenceList()

		console.log('New post ------------------------')
		console.log(newPostData.presenceList)

		await remoteStorage.updatePostData(postData.postId!, newPostData)
		return newPostData
	} catch (e) {
		console.log(e)
	}
	return null
}

export { updatePostPresenceList }
