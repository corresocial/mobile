import { arrayUnion, doc, setDoc } from '@react-native-firebase/firestore'

import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function updatePetitionArrayField(petitionId: string, data: any, fieldName: keyof PetitionEntityOptional) {
	const docRef = doc(firebaseFirestore, PETITION_COLLECTION, petitionId)

	await setDoc(
		docRef,
		{
			[fieldName as string]: arrayUnion(data),
			updatedAt: new Date(),
		},
		{ merge: true }
	)
}

export { updatePetitionArrayField }
