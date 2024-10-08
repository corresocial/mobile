import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebase, firebaseFirestore } from '@infrastructure/firebase/index'

async function updatePollArrayField(pollId: string, data: any, fieldName: keyof PollEntityOptional) {
	const docRef = firebaseFirestore.collection(POLL_COLLECTION).doc(pollId)

	await docRef.set(
		{
			[fieldName as string]: firebase.firestore.FieldValue.arrayUnion(data),
			updatedAt: new Date(),
		},
		{ merge: true }
	)
}

export { updatePollArrayField }
