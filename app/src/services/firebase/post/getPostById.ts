import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '..'

import { PostCollection, PostCollectionType } from '../types'

async function getPostById(postId: string, postCollection: PostCollectionType) {
	try {
		const userRef = doc(firestore, postCollection, postId)
		const userSnap = await getDoc(userRef)
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
