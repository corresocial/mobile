import { addDoc, collection } from 'firebase/firestore'
import { firestore } from '..'

import { PostCollectionType, PostCollection, PostType } from '../types'

import { LocalUserData } from '../../../contexts/types'

async function createPost(post: PostCollection, user: LocalUserData, postCollection: PostCollectionType, postType: PostType) {
	try {
		const docRef = await addDoc(collection(firestore, postCollection), {
			...post,
			postType,
			created_at: new Date(),
			owner: {
				userId: user.userId,
				name: user.name,
				profilePictureUrl: user.profilePictureUrl ? user.profilePictureUrl : [],
			},
		})
		return docRef.id
	} catch (err) {
		console.log(err)
	}
}

export { createPost }
