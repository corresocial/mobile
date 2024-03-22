import { doc, setDoc } from 'firebase/firestore'

import { PostCollection } from '@services/firebase/types'

import { firestore } from '@services/firebase'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }

async function updatePostData(postId: string, data: PostCollection) {
	try {
		const createdAtPost = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {} // Garante que sempre haverá uma data de criação
		const docRef = doc(firestore, 'posts', postId)

		await setDoc(
			docRef,
			{ ...data, updatedAt: new Date(), ...createdAtPost },
			{ merge: true }
		)

		return true
	} catch (error) {
		console.log(error)
		return false
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

export { updatePostData }
