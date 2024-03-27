import { deleteUser } from 'firebase/auth'

import { Id } from '@domain/globalTypes'
import { PostCollection } from '@domain/post/entity/types'

import { deletePost } from '@data/post/remoteStorage/deletePost' // from data/post
import { deletePostPictures } from '@data/post/remoteStorage/deletePostPictures' // from data/post

import { auth } from '@infrastructure/firebase/index'

import { deleteUserData } from '../deleteUserData'
import { deleteUserProfilePicture } from '../deleteUserProfilePicture'

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostCollection[] = []) => {
	// REFACTOR Deve virar um domain method

	const user = auth.currentUser // REFACTOR Requer Autenticação(services) e Posts(data) estruturados

	posts.map(async (post) => {
		await deletePost(post.postId as Id, userId)
		await deletePostPictures(post.picturesUrl || [])
		return true
	})

	await deleteUserProfilePicture(userPictureUrl)
	await deleteUserData(userId)
	await deleteUser(user as any)

	return true
}

export { removeAllUserData }
