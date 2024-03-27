import { PostCollection } from '@domain/post/entity/types'

import { updateDocField } from '@data/user/remoteRepository/sujeira/updateDocField'

import { updatePostData } from './updatePostData' // from data/post

const markPostAsComplete = async (userId: string, postId: string, currentPost: PostCollection, userPosts: PostCollection[]) => { // REFACTOR Precisa mesmo de todos so posts?
	try { // REFACTOR Deve virar um domain method
		await updatePostData(postId, currentPost)
		await updateDocField('users', userId, 'posts', userPosts, false) // REFACTOR Depende da funão updatePost

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { markPostAsComplete }
