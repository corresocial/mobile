import { deleteUser } from 'firebase/auth'

import { Id } from '@domain/entities/globalTypes'

import { useUserRepository } from '@data/user/useUserRepository'

import { PostCollection } from '@services/firebase/types'

import { auth } from '@services/firebase'
import { deletePost } from '@services/firebase/post/deletePost'
import { deletePostPictures } from '@services/firebase/post/deletePostPictures'

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
