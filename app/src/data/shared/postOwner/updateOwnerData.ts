import { doc, writeBatch } from 'firebase/firestore'

import { UserOwner } from '@domain/user/entity/types'

import { PETITION_COLLECTION, POLL_COLLECTION, POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function updateOwnerData(ownerPost: Partial<UserOwner>, userPostIds: string[], collection: typeof POST_COLLECTION | typeof POLL_COLLECTION | typeof PETITION_COLLECTION) {
	try {
		console.log(ownerPost)
		if (!userPostIds) return true

		if (!ownerPost?.userId) throw new Error('Essas postagens não podem ser atualizadas sem um identificador de usuário')

		let owner: Partial<UserOwner> = { userId: ownerPost?.userId }
		if (ownerPost && ownerPost.name) {
			owner = { ...owner, name: ownerPost.name }
		}
		if (ownerPost && ownerPost.profilePictureUrl) {
			owner = { ...owner, profilePictureUrl: ownerPost.profilePictureUrl }
		}

		const BATCH_SIZE = 500
		const batches = []

		for (let i = 0; i < userPostIds.length; i += BATCH_SIZE) {
			const batchIds = userPostIds.slice(i, i + BATCH_SIZE)
			const batch = writeBatch(firestore)
			batchIds.forEach((postId) => {
				const ref = doc(firestore, collection, postId)
				batch.update(ref, {
					owner,
					updatedAt: new Date(),
				})
			})
			batches.push(batch.commit())
		}

		await Promise.all(batches)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { updateOwnerData }
