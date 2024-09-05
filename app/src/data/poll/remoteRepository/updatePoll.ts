import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number };

async function updatePoll(pollId: string, data: PollEntityOptional) {
	const createdAt = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {}
	const docRef = firebaseFirestore.collection(POLL_COLLECTION).doc(pollId)

	await docRef.set(
		{ ...data, updatedAt: new Date(), ...createdAt },
		{ merge: true }
	)
}

const getNewDate = (date: any) => {
	if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
		const { _seconds, seconds } = date as DateFirestore
		if (seconds) return new Date(seconds * 1000)
		return new Date(_seconds * 1000)
	}

	return new Date(date)
}

export { updatePoll }
