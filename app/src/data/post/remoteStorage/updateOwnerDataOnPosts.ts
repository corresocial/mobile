import { doc, setDoc } from 'firebase/firestore'

import { PostCollection } from '@domain/post/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function updateOwnerDataOnPosts(ownerPost: Partial<PostCollection['owner']>, userPostIds: string[]) {
	try {
		if (!userPostIds) return true

		const owner = {
			owner: ownerPost.name,
			ownerPost: ownerPost.profilePictureUrl
		}

		userPostIds.map(async (postId) => {
			const ref = doc(firestore, 'posts', postId)

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

export { updateOwnerDataOnPosts }
