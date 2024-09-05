import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

type DateFirestore = { nanoseconds: number, seconds: number, _seconds: number };

async function updatePetition(petitionId: string, data: PetitionEntityOptional) {
	const createdAt = data.createdAt ? { createdAt: getNewDate(data.createdAt) } : {}
	const docRef = firebaseFirestore.collection(PETITION_COLLECTION).doc(petitionId)

	await docRef.set(
		{ ...data, updatedAt: new Date(), ...createdAt },
		{ merge: true }
	)
}

const getNewDate = (date: any) => {
	if (Object.keys(date).includes('seconds') || Object.keys(date).includes('_seconds')) {
		const { _seconds, seconds } = date as DateFirestore
		if (seconds) return new Date(seconds * 1000)
		return new Date(_seconds * 1000)
	}

	return new Date(date)
}

export { updatePetition }
