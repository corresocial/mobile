import { doc, getDoc } from 'firebase/firestore'

import { PostCollection } from '../types'

import { firestore } from '@services/firebase'

async function getPostById(postId: string) {
	try {
		const postRef = doc(firestore, 'posts', postId)
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