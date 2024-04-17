import { deleteUser } from 'firebase/auth'

import { Id } from '@domain/globalTypes'
import { PostEntityOptional } from '@domain/post/entity/types'

import { deletePost } from '@data/post/remoteStorage/deletePost' // from data/post
import { deletePostMedias } from '@data/post/remoteStorage/deletePostMedias' // from data/post

import { auth } from '@infrastructure/firebase/index'

import { deleteUserData } from '../deleteUserData'
import { deleteUserProfilePicture } from '../deleteUserProfilePicture'

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostEntityOptional[] = []) => {
	// REFACTOR Deve virar um domain method

	const user = auth.currentUser // REFACTOR Requer Autenticação(services) e Posts(data) estruturados

	posts.map(async (post) => {
		await deletePost(post.postId as Id, userId)
		await deletePostMedias(post.picturesUrl || [], 'pictures')
		return true
	})

	await deleteUserProfilePicture(userPictureUrl)
	await deleteUserData(userId)
	await deleteUser(user as any)

	return true
}

export { removeAllUserData }
