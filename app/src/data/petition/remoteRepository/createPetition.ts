import { addDoc, collection } from '@react-native-firebase/firestore'

import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPetition(petitionData: PetitionEntityOptional) {
	const collectionRef = collection(firebaseFirestore, PETITION_COLLECTION)
	await addDoc(collectionRef, petitionData)
}

export { createPetition }
