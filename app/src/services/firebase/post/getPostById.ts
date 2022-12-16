import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '..'

import { PostCollection, PostCollectionType } from '../types'

async function getPostById(postId: string, postCollection: PostCollectionType) {
	try {
		const postRef = doc(firestore, postCollection, postId)
		const userSnap = await getDoc(postRef)
		if (userSnap.exists()) {
			return {
				postId, ...userSnap.data() as PostCollection
			}
		}
		return null
	} catch (e) {
		console.log(e)
		return false
	}
}

export { getPostById }
