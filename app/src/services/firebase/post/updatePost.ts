import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '..'
import { PostCollectionType } from '../types'

async function updatePost(postCollection: PostCollectionType, postId: string, data: any) { // TODO type
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
