import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '..'
import { PostCollection, PostCollectionType } from '../types'

async function updatePost(postCollection: PostCollectionType, postId: string, data: PostCollection) {
	type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }
	const getNewDate = (date: any) => {
		if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
			const { _seconds, seconds } = date as DateFirestore

			if (seconds) {
				return new Date(seconds * 1000)
			}
			return new Date(_seconds * 1000)
		}
		return new Date(date)
	}

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
