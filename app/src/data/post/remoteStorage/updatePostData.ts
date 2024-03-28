import { doc, setDoc } from 'firebase/firestore'

import { PostEntityOptional } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number }

async function updatePostData(postId: string, data: PostEntityOptional) {
	try {
		const createdAtPost = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {} // Garante que sempre haverá uma data de criação
		const docRef = doc(firestore, POST_COLLECTION, postId)

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
