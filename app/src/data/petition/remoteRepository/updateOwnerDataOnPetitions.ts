import { UserOwner } from '@domain/user/entity/types'

import { updateOwnerData } from '@data/shared/postOwner/updateOwnerData'
import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

async function updateOwnerDataOnPetitions(ownerPetition: Partial<UserOwner>, userPetitionIds: string[]) {
	try {
		await updateOwnerData(ownerPetition, userPetitionIds, PETITION_COLLECTION)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerDataOnPetitions }
