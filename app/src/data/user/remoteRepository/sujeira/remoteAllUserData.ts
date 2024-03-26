import { deleteUser } from 'firebase/auth'

import { Id } from '@domain/globalTypes'

import { deletePost } from '@data/post/remoteStorage/deletePost' // from data/post
import { deletePostPictures } from '@data/post/remoteStorage/deletePostPictures' // from data/post
import { useUserRepository } from '@data/user/useUserRepository'

import { PostCollection } from '@domain/post/entity/types'

import { auth } from '@infrastructure/firebase/index'

const { remoteStorage } = useUserRepository()

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostCollection[] = []) => {
	const user = auth.currentUser // REFACTOR Requer Autenticação(services) e Posts(data) estruturados

	posts.map(async (post) => {
		await deletePost(post.postId as Id, userId)
		await deletePostPictures(post.picturesUrl || [])
		return true
	})

	await remoteStorage.deleteUserProfilePicture(userPictureUrl)
	await remoteStorage.deleteUserData(userId)
	await deleteUser(user as any)

	return true
}

export { removeAllUserData }
