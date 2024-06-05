import { PollEntityOptional } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'
import { updateOwnerData } from '@data/shared/postOwner/updateOwnerData'

async function updateOwnerDataOnPolls(ownerPoll: Partial<PollEntityOptional['owner']>, userPollIds: string[]) {
	try {
		await updateOwnerData(ownerPoll, userPollIds, POLL_COLLECTION)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerDataOnPolls }
