import { collection, addDoc } from 'firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPollResponse(pollId: string, data: PollEntity['privateResponses']) {
	const collectionRef = collection(firestore, POLL_COLLECTION, pollId, 'responses')
	await addDoc(collectionRef, { ...data })
}

export { createPollResponse }
