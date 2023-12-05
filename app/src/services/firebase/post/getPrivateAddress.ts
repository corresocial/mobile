import { doc, getDoc } from 'firebase/firestore'

import { PostType } from '../types'

import { firestore } from '@services/firebase'

import { getPostCollectionName } from '../common/dbAuxiliaryFunctions'

async function getPrivateAddress(postType: PostType, postId: string) {
	const postCollection = getPostCollectionName(postType)

	try {
		const docRef = doc(firestore, postCollection, postId, 'private', `address${postId}`)
		const docSnap = await getDoc(docRef)
		if (docSnap.exists()) {
			return {
				postId, ...docSnap.data() as any
			}
		}
		return null
	} catch (e) {
		console.log(e)
		return false
	}
}

export { getPrivateAddress }
