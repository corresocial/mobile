import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPoll(pollData: PollEntityOptional) {
	const collectionRef = firebaseFirestore.collection(POLL_COLLECTION)
	await collectionRef.add(pollData)
}

export { createPoll }
