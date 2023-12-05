import { deleteUser } from 'firebase/auth'

import { Id, PostCollection } from '../../types'

import { auth } from '../..'
import { deletePost } from '../../post/deletePost'
import { deletePostPictures } from '../../post/deletePostPictures'
import { deleteUserData } from '../deleteUserData'
import { deleteUserPicture } from '../deleteUserPicture'

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostCollection[] = []) => {
	const user = auth.currentUser

	posts.map(async (post) => {
		await deletePost(post.postId as Id, userId)
		await deletePostPictures(post.picturesUrl || [])
		return true
	})

	await deleteUserPicture(userPictureUrl)
	await deleteUserData(userId)
	await deleteUser(user as any)

	return true
}

export { removeAllUserData }
