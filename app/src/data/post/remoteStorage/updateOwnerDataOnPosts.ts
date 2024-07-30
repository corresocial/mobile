import { UserOwner } from '@domain/user/entity/types'

import { updateOwnerData } from '@data/shared/postOwner/updateOwnerData'
import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

async function updateOwnerDataOnPosts(ownerPost: Partial<UserOwner>, userPostIds: string[]) {
	try {
		await updateOwnerData(ownerPost, userPostIds, POST_COLLECTION)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerDataOnPosts }
