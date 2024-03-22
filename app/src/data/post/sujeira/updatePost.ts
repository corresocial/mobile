import { doc, setDoc } from 'firebase/firestore'

import { PostCollection, PostCollectionType } from '../types'

import { firestore } from '@services/firebase'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }

async function updatePost(postCollection: PostCollectionType, postId: string, data: PostCollection) {
	try {
		const createdAtPost = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {}

		const ref = doc(firestore, postCollection, postId)
		const finished = await setDoc(
			ref,
			{ ...data, updatedAt: new Date(), ...createdAtPost },
			{ merge: true },
		).then(() => true)
		return finished
	} catch (error) {
		console.log(error)
	}
}

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

export { updatePost }
