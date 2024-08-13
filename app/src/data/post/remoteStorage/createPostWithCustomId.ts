import { doc, setDoc } from 'firebase/firestore'

import { PostEntityOptional, PostType } from '@domain/post/entity/types'
import { UserOwner } from '@domain/user/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

async function createPostWithCustomId(
	postData: PostEntityOptional,
	ownerPost: UserOwner,
	postType: PostType,
	customId: string
) {
	try {
		const docRef = doc(firestore, POST_COLLECTION, customId)
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
