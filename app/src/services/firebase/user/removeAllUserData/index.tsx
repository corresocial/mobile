import { deleteUser } from 'firebase/auth'

import { usePostRepository } from '@data/post/usePostRepository'
import { useUserRepository } from '@data/user/useUserRepository'

import { Id, PostCollection } from '../../types'

import { auth } from '../..'

const { remoteStorage } = useUserRepository()
const { remoteStorage: remotePostStorage } = usePostRepository()

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostCollection[] = []) => {
	const user = auth.currentUser

	posts.map(async (post) => {
		await remotePostStorage.deletePost(post.postId as Id, userId)
		await remotePostStorage.deletePostPictures(post.picturesUrl || [])
		return true
	})

	await remoteStorage.deleteUserProfilePicture(userPictureUrl) // Storage
	await remoteStorage.deleteUserData(userId) // Firestore
	await deleteUser(user as any) // Auth

	return true
}

export { removeAllUserData }
