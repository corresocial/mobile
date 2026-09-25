import { deleteDoc, doc } from '@react-native-firebase/firestore'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

async function deletePost(postId: string) {
	try {
		const docRef = doc(firebaseFirestore, POST_COLLECTION, postId)
		await deleteDoc(docRef)
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deletePost }
