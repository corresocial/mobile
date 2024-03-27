import { deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore'

import { PostEntityOptional } from '@domain/post/entity/types'
import { UserEntity } from '@domain/user/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function deletePost(postId: string, userId: string) {
	try {
		const docRef = doc(firestore, 'posts', postId)

		await deleteDoc(docRef)

		const postOwnerRef = doc(firestore, 'users', userId)
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
