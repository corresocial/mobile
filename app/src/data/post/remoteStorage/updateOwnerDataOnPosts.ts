import { PostEntityOptional } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'
import { updateOwnerData } from '@data/shared/postOwner/updateOwnerData'

async function updateOwnerDataOnPosts(ownerPost: Partial<PostEntityOptional['owner']>, userPostIds: string[]) {
	try {
		await updateOwnerData(ownerPost, userPostIds, POST_COLLECTION)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerDataOnPosts }
