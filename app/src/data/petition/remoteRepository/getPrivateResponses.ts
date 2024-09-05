import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPrivateResponses(petitionId: string) {
	const collectionRef = firebaseFirestore.collection(PETITION_COLLECTION).doc(petitionId).collection('responses')
	const querySnapshot = await collectionRef.get()

	if (querySnapshot) {
		const responses = querySnapshot.docs.map((doc) => doc.data())
		return responses as PetitionEntity['privateResponses']
	}

	return [] as PetitionEntity['privateResponses']
}

export { getPrivateResponses }
