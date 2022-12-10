import {
	deleteDoc,
	doc,
	collection,
	updateDoc,
	getDoc,
} from 'firebase/firestore'
import { firestore } from '..'

import { PostCollection, UserCollection } from '../types'

async function deletePost(postId: string, userId: string) {
	try {
		const docRef = doc(collection(firestore, 'posts'), postId)
		const postDeleted = await deleteDoc(docRef)
			.then(() => getDoc(doc(firestore, 'users', userId)))
			.then((userData: UserCollection | any) => { // TODO Type
				updateDoc(doc(firestore, 'users', userId), {
					...userData,
					posts: userData.posts.filter((post: PostCollection) => post.postId !== postId),
					updatedAt: new Date()
				})
			},)
			.then(() => true)
		return postDeleted
	} catch (e) {
		console.log(e)
	}
}

export { deletePost }
