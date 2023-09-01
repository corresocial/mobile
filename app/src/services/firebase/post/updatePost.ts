import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '..'
import { PostCollection, PostCollectionType } from '../types'
import { getNewDate } from '../../../common/auxiliaryFunctions'

async function updatePost(postCollection: PostCollectionType, postId: string, data: PostCollection) {
	try {
		const createdAtPost = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {}

		const ref = doc(firestore, postCollection, postId)
		const finished = setDoc(
			ref,
			{ ...data, updatedAt: new Date(), ...createdAtPost },
			{ merge: true },
		).then(() => true)
		return finished
	} catch (error) {
		console.log(error)
	}
}

export { updatePost }
