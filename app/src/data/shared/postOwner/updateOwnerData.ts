import { doc, setDoc } from 'firebase/firestore'

import { PostEntityOptional } from '@domain/post/entity/types'

import { PETITION_COLLECTION, POLL_COLLECTION, POST_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function updateOwnerData(ownerPost: Partial<PostEntityOptional['owner']>, userPostIds: string[], collection: typeof POST_COLLECTION | typeof POLL_COLLECTION | typeof PETITION_COLLECTION) {
	try {
		if (!userPostIds) return true

		let owner = {}
		if (ownerPost && ownerPost.name) {
			owner = { ...owner, name: ownerPost.name }
		}
		if (ownerPost && ownerPost.name) {
			owner = { ...owner, profilePictureUrl: ownerPost.profilePictureUrl }
		}

		console.log(owner)

		userPostIds.forEach(async (postId) => {
			const ref = doc(firestore, collection, postId)

			await setDoc(
				ref,
				{ owner, updatedAt: new Date() },
				{ merge: true },
			)
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerData }
