import { addDoc, collection } from 'firebase/firestore'

import { firestore } from '..'

import { LocalUserData } from '@contexts/types'

import { PostCollectionType, PostCollection, PostType } from '../types'

async function createPost(post: PostCollection, user: LocalUserData, postCollection: PostCollectionType, postType: PostType) {
	try {
		const docRef = await addDoc(collection(firestore, postCollection), {
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
	} catch (err: any) {
		console.log(err)
		throw new Error(err)
	}
}

export { createPost }
