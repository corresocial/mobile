import { doc, getDoc } from 'firebase/firestore'

import { firestore } from '..'

import { PostCollection, PostCollectionType } from '../types'

async function getPostById(postId: string, postCollection: PostCollectionType) {
	try {
		const postRef = doc(firestore, postCollection, postId)
		const postSnap = await getDoc(postRef)
		if (postSnap.exists()) {
			return {
				postId, ...postSnap.data() as PostCollection
			}
		}
		return null
	} catch (e) {
		console.log(e)
		return false
	}
}

export { getPostById }
