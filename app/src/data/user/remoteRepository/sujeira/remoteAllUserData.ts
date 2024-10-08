import { Id } from '@domain/globalTypes'
import { PostEntityOptional } from '@domain/post/entity/types'

import { usePostRepository } from '@data/post/usePostRepository'

import { firebaseAuth } from '@infrastructure/firebase'

import { deleteUserData } from '../deleteUserData'
import { deleteUserProfilePicture } from '../deleteUserProfilePicture'

const removeAllUserData = async (userId: Id, userPictureUrl: string[], posts: PostEntityOptional[] = []) => {
	// REFACTOR Deve virar um domain method
	if (!firebaseAuth.currentUser?.uid) throw new Error('Usuário não encontrado ou não está logado!')

	const user = firebaseAuth.currentUser // REFACTOR Requer Autenticação(services) e Posts(data) estruturados

	const { remoteStorage } = usePostRepository()

	const userPosts = await remoteStorage.getPostsByUser(firebaseAuth.currentUser?.uid, 1, null, false, true)

	userPosts.forEach(async (postData) => {
		try {
			await remoteStorage.deletePost(postData.postId)
			await remoteStorage.deletePostMedias(postData.picturesUrl || [], 'pictures')
		} catch (error: any) {
			console.log(error)
		}
	})

	await deleteUserProfilePicture(userPictureUrl)
	await deleteUserData(userId)
	await user?.delete()

	return true
}

export { removeAllUserData }
