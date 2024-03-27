import { doc, setDoc } from 'firebase/firestore'

import { PostEntityOptional } from '@domain/post/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function updateOwnerDataOnPosts(ownerPost: Partial<PostEntityOptional['owner']>, userPostIds: string[]) {
	try {
		if (!userPostIds) return true

		let owner = {}
		if (ownerPost && ownerPost.name) {
			owner = { ...owner, name: ownerPost.name }
		}
		if (ownerPost && ownerPost.name) {
			owner = { ...owner, profilePictureUrl: ownerPost.profilePictureUrl }
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
