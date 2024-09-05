import { PostEntityOptional } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number };

async function updatePostData(postId: string, data: PostEntityOptional, merge = true) {
	try {
		const createdAtPost = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {}
		const docRef = firebaseFirestore.collection(POST_COLLECTION).doc(postId)

		await docRef.set(
			{ ...data, updatedAt: new Date(), ...createdAtPost },
			{ merge: merge }
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
