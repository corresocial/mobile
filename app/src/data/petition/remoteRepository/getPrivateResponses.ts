import { collection, getDocs } from 'firebase/firestore'

import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getPrivateResponses(petitionId: string) {
	const collectionRef = collection(firestore, PETITION_COLLECTION, petitionId, 'responses')
	const docsSnap = await getDocs(collectionRef)

	if (docsSnap) {
		const responses = docsSnap.docs.map((doc) => doc.data())
		return responses as PetitionEntity['privateResponses']
	}

	return [] as PetitionEntity['privateResponses']
}

export { getPrivateResponses }
