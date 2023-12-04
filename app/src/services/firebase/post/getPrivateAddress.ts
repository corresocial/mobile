import { doc, getDoc } from 'firebase/firestore'
import { firestore } from '..'
import { getPostCollectionName } from '@common/dbAuxiliaryFunctions'

import { PostType } from '../types'

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
