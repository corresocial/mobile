import { doc, getDoc } from 'firebase/firestore'

import { PostCollection } from '@domain/post/entity/types'

import { firestore } from '@infrastructure/firebase/index'

async function getPostById(postId: string) {
	try {
		const postRef = doc(firestore, 'posts', postId)
		const postSnap = await getDoc(postRef)

		if (postSnap.exists()) {
			return { postId, ...postSnap.data() as PostCollection }
		}

		return null
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getPostById }
