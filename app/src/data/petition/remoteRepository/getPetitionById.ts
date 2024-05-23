import { doc, getDoc } from 'firebase/firestore'

import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function getPetitionDataById(petitionId: string) {
	const postRef = doc(firestore, PETITION_COLLECTION, petitionId)
	const postSnap = await getDoc(postRef)

	if (postSnap.exists()) {
		return { ...postSnap.data(), petitionId } as PetitionEntity
	}
}

export { getPetitionDataById }
