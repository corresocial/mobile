import { collection, getDocs } from 'firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getPrivateResponses(pollId: string) {
	const collectionRef = collection(firestore, POLL_COLLECTION, pollId, 'responses')
	const docsSnap = await getDocs(collectionRef)

	if (docsSnap) {
		const responses = docsSnap.docs.map((doc) => doc.data())
		return responses as PollEntity['privateResponses']
	}

	return [] as PollEntity['privateResponses']
}

export { getPrivateResponses }
