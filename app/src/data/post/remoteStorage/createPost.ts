import { addDoc, collection } from 'firebase/firestore'

import { PostCollection, PostType } from '@domain/post/entity/types'

import { LocalUserData } from '@contexts/AuthContext/types'

import { firestore } from '@infrastructure/firebase/index'

async function createPost(post: PostCollection, user: LocalUserData, postType: PostType) {
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
