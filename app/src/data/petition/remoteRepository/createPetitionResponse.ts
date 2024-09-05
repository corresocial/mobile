import { PrivatePetitionResponse } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPetitionResponse(petitionId: string, data: PrivatePetitionResponse) {
	const collectionRef = firebaseFirestore.collection(PETITION_COLLECTION).doc(petitionId).collection('responses')
	await collectionRef.add({ ...data })
}

export { createPetitionResponse }
