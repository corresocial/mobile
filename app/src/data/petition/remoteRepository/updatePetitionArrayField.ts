import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebase, firebaseFirestore } from '@infrastructure/firebase/index'

async function updatePetitionArrayField(petitionId: string, data: any, fieldName: keyof PetitionEntityOptional) {
	const docRef = firebaseFirestore.collection(PETITION_COLLECTION).doc(petitionId)

	await docRef.set(
		{
			[fieldName as string]: firebase.firestore.FieldValue.arrayUnion(data),
			updatedAt: new Date(),
		},
		{ merge: true }
	)
}

export { updatePetitionArrayField }
