import { collection, getDocs } from '@react-native-firebase/firestore'

import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function getPrivateResponses(petitionId: string) {
	const collectionRef = collection(firebaseFirestore, PETITION_COLLECTION, petitionId, 'responses')
	const querySnapshot = await getDocs(collectionRef)

	if (querySnapshot) {
		const responses = querySnapshot.docs.map((doc) => doc.data())
		return responses as PetitionEntity['privateResponses']
	}

	return [] as PetitionEntity['privateResponses']
}

export { getPrivateResponses }
