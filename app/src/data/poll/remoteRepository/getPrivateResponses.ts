import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPrivateResponses(pollId: string) {
	const collectionRef = firebaseFirestore.collection(POLL_COLLECTION).doc(pollId).collection('responses')

	try {
		const docsSnap = await collectionRef.get()

		if (!docsSnap.empty) {
			const responses = docsSnap.docs.map((doc) => doc.data())
			return responses as PollEntity['privateResponses']
		}

		return [] as PollEntity['privateResponses']
	} catch (error) {
		console.log(error)
		return [] as PollEntity['privateResponses']
	}
}

export { getPrivateResponses }
