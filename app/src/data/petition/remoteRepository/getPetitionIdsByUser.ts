import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getPetitionIdsByUser(userId: string) {
	try {
		const collectionRef = firebaseFirestore.collection(PETITION_COLLECTION)
		const petitionsByUserQuery = collectionRef
			.where('owner.userId', '==', userId)
			.orderBy('createdAt', 'desc')

		const petitionsSnap = await petitionsByUserQuery.get()
		return petitionsSnap.docs.map((doc) => doc.id)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os abaixo assinados')
	}
}
