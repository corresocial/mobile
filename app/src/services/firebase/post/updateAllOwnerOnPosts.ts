import { doc, setDoc } from 'firebase/firestore'

import { Id } from '../types'

import { firestore } from '../index'

async function updateAllOwnerOnPosts(
	owner: {
		userId?: string,
		name?: string,
		profilePictureUrl?: string[]
	},
	userPostIds: Id[]
) {
	if (!userPostIds) return

	userPostIds.map(async (postId) => {
		const ref = doc(firestore, 'posts', postId)
		await setDoc(
			ref,
			{
				owner,
				updatedAt: new Date(),
			},
			{ merge: true },
		)
	})
}

export { updateAllOwnerOnPosts }
