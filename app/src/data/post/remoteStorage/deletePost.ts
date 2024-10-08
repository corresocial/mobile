import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function deletePost(postId: string) {
	try {
		const docRef = firebaseFirestore.collection(POST_COLLECTION).doc(postId)
		await docRef.delete()
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deletePost }
