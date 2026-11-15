import { addDoc, collection } from '@react-native-firebase/firestore'

import { PrivatePetitionResponse } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function createPetitionResponse(petitionId: string, data: PrivatePetitionResponse) {
	const collectionRef = collection(firebaseFirestore, PETITION_COLLECTION, petitionId, 'responses')
	await addDoc(collectionRef, { ...data })
}

export { createPetitionResponse }
