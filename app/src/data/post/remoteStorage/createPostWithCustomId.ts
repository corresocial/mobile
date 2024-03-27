import { doc, setDoc } from 'firebase/firestore'

import { PostEntity, PostEntityOptional, PostType } from '@domain/post/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function createPostWithCustomId(
	postData: PostEntityOptional,
	ownerPost: PostEntity['owner'],
	postType: PostType,
	customId: string
) {
	try {
		const docRef = doc(firestore, 'posts', customId)
		await setDoc(docRef, {
			...postData,
			postType,
			createdAt: postData.createdAt ? postData.createdAt : new Date(),
			owner: {
				userId: ownerPost.userId,
				name: ownerPost.name,
				profilePictureUrl: ownerPost.profilePictureUrl ? ownerPost.profilePictureUrl : [],
			},
		})

		return customId
	} catch (err) {
		console.log(err)
		return false
	}
}

export { createPostWithCustomId }
