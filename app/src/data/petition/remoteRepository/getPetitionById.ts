import { doc, getDoc } from '@react-native-firebase/firestore'

import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPetitionDataById(petitionId: string) {
	const postRef = doc(firebaseFirestore, PETITION_COLLECTION, petitionId)
	const postSnap = await getDoc(postRef)

	if (postSnap.exists()) {
		return { ...postSnap.data(), petitionId } as PetitionEntity
	}
}

export { getPetitionDataById }
