import { doc, setDoc } from 'firebase/firestore'
import { firestore } from '../index'
import { Id } from '../types'

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
