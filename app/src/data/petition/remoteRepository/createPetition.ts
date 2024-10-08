import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPetition(petitionData: PetitionEntityOptional) {
	const collectionRef = firebaseFirestore.collection(PETITION_COLLECTION)
	await collectionRef.add(petitionData)
}

export { createPetition }
