import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getPostIdsByUser(userId: string) {
	try {
		const postsByUserQuery = firebaseFirestore
			.collection(POST_COLLECTION)
			.where('owner.userId', '==', userId)
			.orderBy('createdAt', 'desc')

		const postsSnap = await postsByUserQuery.get()
		return postsSnap.docs.map((doc) => doc.id)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os identificadores dos posts')
	}
}
