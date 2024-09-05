import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getPollIdsByUser(userId: string) {
	try {
		const collectionRef = firebaseFirestore.collection(POLL_COLLECTION)
		const pollsByUserQuery = collectionRef
			.where('owner.userId', '==', userId)
			.orderBy('createdAt', 'desc')

		const pollsSnap = await pollsByUserQuery.get()
		return pollsSnap.docs.map((doc) => doc.id)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as enquetes')
	}
}
