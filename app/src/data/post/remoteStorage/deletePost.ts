import { deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'

import { PostEntityOptional } from '@domain/post/entity/types'
import { UserEntity } from '@domain/user/entity/types'

import { POST_COLLECTION, USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function deletePost(postId: string, userId: string) {
	try {
		const docRef = doc(firestore, POST_COLLECTION, postId)

		await deleteDoc(docRef)

		const postOwnerRef = doc(firestore, USER_COLLECTION, userId)
		const userData = await getDoc(postOwnerRef) as UserEntity | any

		const updatedUserPosts = userData.data()
			? userData.data().posts.filter((post: PostEntityOptional) => post.postId !== postId)
			: []

		await updateDoc(postOwnerRef, {
			...userData.data(), // REFACTOR Testar se realmente precisa consultar os dados do owner para fazer o update
			posts: updatedUserPosts,
			updatedAt: new Date()
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deletePost }
