import { addDoc, collection } from 'firebase/firestore'

import { PostEntityOptional, PostType } from '@domain/post/entity/types'
import { UserEntityOptional } from '@domain/user/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function createPost(post: PostEntityOptional, user: UserEntityOptional, postType: PostType) {
	try {
		const docRef = await addDoc(collection(firestore, 'posts'), {
			...post,
			postType,
			createdAt: new Date(),
			owner: {
				userId: user.userId,
				name: user.name,
				profilePictureUrl: user.profilePictureUrl ? user.profilePictureUrl : [],
			},
		})

		return docRef.id
	} catch (error) {
		console.log(error)
		return null
	}
}

export { createPost }
