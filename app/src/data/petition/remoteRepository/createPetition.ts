import { addDoc, collection } from 'firebase/firestore'

import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPetition(petitionData: PetitionEntityOptional) {
	const collectionRef = collection(firestore, PETITION_COLLECTION)
	await addDoc(collectionRef, petitionData)
}

export { createPetition }
