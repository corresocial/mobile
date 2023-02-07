import {
	deleteDoc,
	doc,
	updateDoc,
	getDoc,
} from 'firebase/firestore'
import { firestore } from '..'

import { PostCollection, UserCollection } from '../types'

async function deletePost(postId: string, userId: string) {
	try {
		const docRef = doc(firestore, 'posts', postId)

		await deleteDoc(docRef)
		const userData = await getDoc(doc(firestore, 'users', userId)) as UserCollection | any
		updateDoc(doc(firestore, 'users', userId), {
			...userData.data(),
			posts: userData.data().posts.filter((post: PostCollection) => post.postId !== postId),
			updatedAt: new Date()
		})
		return true
	} catch (e) {
		console.log(e)
		return false
	}
}

export { deletePost }
