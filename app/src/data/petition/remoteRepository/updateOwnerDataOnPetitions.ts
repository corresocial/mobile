import { PetitionEntityOptional } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'
import { updateOwnerData } from '@data/shared/postOwner/updateOwnerData'

async function updateOwnerDataOnPetitions(ownerPetition: Partial<PetitionEntityOptional['owner']>, userPetitionIds: string[]) {
	try {
		await updateOwnerData(ownerPetition, userPetitionIds, PETITION_COLLECTION)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerDataOnPetitions }
