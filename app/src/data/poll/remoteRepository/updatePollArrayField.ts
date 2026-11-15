import { arrayUnion, doc, setDoc } from '@react-native-firebase/firestore'

import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function updatePollArrayField(pollId: string, data: any, fieldName: keyof PollEntityOptional) {
	const docRef = doc(firebaseFirestore, POLL_COLLECTION, pollId)

	await setDoc(
		docRef,
		{
			[fieldName as string]: arrayUnion(data),
			updatedAt: new Date(),
		},
		{ merge: true }
	)
}

export { updatePollArrayField }
