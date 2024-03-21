import { deleteUser } from 'firebase/auth'

import { Id } from '@domain/entities/globalTypes'

import { useUserRepository } from '@data/user/useUserRepository'

import { PostCollection } from '@services/firebase/types'

import { auth } from '@services/firebase'
import { deletePost } from '@services/firebase/post/deletePost'
import { deletePostPictures } from '@services/firebase/post/deletePostPictures'
import { deleteUserPicture } from '@services/firebase/user/deleteUserPicture'

const { remoteUser } = useUserRepository()

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostCollection[] = []) => {
	const user = auth.currentUser

	posts.map(async (post) => {
		await deletePost(post.postId as Id, userId)
		await deletePostPictures(post.picturesUrl || [])
		return true
	})

	await deleteUserPicture(userPictureUrl)
	await remoteUser.deleteUserData(userId)
	await deleteUser(user as any)

	return true
}

export { removeAllUserData }
