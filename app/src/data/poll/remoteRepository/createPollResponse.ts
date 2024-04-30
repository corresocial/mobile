import { collection, addDoc } from 'firebase/firestore'

import { PrivatePollResponse } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPollResponse(pollId: string, data: PrivatePollResponse) {
	const collectionRef = collection(firestore, POLL_COLLECTION, pollId, 'responses')
	await addDoc(collectionRef, { ...data })
}

export { createPollResponse }
