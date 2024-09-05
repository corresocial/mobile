import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPetitionDataById(petitionId: string) {
	const postRef = firebaseFirestore.collection(PETITION_COLLECTION).doc(petitionId)
	const postSnap = await postRef.get()

	if (postSnap.exists) {
		return { ...postSnap.data(), petitionId } as PetitionEntity
	}
}

export { getPetitionDataById }
