import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '..'
import { PostCollection, PostCollectionType } from '../types'

async function updatePost(postCollection: PostCollectionType, postId: string, data: PostCollection) {
	try {
		const ref = doc(firestore, postCollection, postId)
		const finished = setDoc(
			ref,
			{ ...data, updatedAt: new Date() },
			{ merge: true },
		).then(() => true)
		return finished
	} catch (error) {
		console.log(error)
	}
}

export { updatePost }
