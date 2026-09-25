import { collection, getDocs } from '@react-native-firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPrivateResponses(pollId: string) {
	const collectionRef = collection(firebaseFirestore, POLL_COLLECTION, pollId, 'responses')

	try {
		const docsSnap = await getDocs(collectionRef)

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
