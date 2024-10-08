import { PrivatePollResponse } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPollResponse(pollId: string, data: PrivatePollResponse) {
	const collectionRef = firebaseFirestore.collection(POLL_COLLECTION).doc(pollId).collection('responses')
	await collectionRef.add({ ...data })
}

export { createPollResponse }
