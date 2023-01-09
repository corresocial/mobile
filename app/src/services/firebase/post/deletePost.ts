import {
	deleteDoc,
	doc,
	collection,
	updateDoc,
	getDoc,
} from 'firebase/firestore'
import { firestore } from '..'
import { getPostCollectionName } from '../common/dbAuxiliaryFunctions'

import { PostCollection, PostType, UserCollection } from '../types'

async function deletePost(postId: string, postType: PostType, userId: string) {
	const postCollection = getPostCollectionName(postType)

	try {
		const docRef = doc(collection(firestore, postCollection), postId)

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
