import { addDoc, collection } from '@react-native-firebase/firestore'

import { PrivatePollResponse } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPollResponse(pollId: string, data: PrivatePollResponse) {
	const collectionRef = collection(firebaseFirestore, POLL_COLLECTION, pollId, 'responses')
	await addDoc(collectionRef, { ...data })
}

export { createPollResponse }
