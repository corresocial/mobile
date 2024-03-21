import { deleteUser } from 'firebase/auth'

import { useUserRepository } from '@data/user/useUserRepository'

import { Id, PostCollection } from '../../types'

import { auth } from '../..'
import { deletePost } from '../../post/deletePost'
import { deletePostPictures } from '../../post/deletePostPictures'

const { remoteStorage } = useUserRepository()

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostCollection[] = []) => {
	const user = auth.currentUser

	posts.map(async (post) => {
		await deletePost(post.postId as Id, userId)
		await deletePostPictures(post.picturesUrl || [])
		return true
	})

	await remoteStorage.deleteUserProfilePicture(userPictureUrl) // Storage
	await remoteStorage.deleteUserData(userId) // Firestore
	await deleteUser(user as any) // Auth

	return true
}

export { removeAllUserData }
