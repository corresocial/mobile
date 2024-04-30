import { arrayUnion, doc, setDoc } from 'firebase/firestore'

import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function updatePollArrayField(pollId: string, data: any, fieldName: keyof PollEntityOptional) {
	const docRef = doc(firestore, POLL_COLLECTION, pollId)

	await setDoc(
		docRef,
		{
			[fieldName as string]: arrayUnion(data),
			updatedAt: new Date(),
		},
		{ merge: true },
	)
}

export { updatePollArrayField }
