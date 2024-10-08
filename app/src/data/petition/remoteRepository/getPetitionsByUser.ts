import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firebaseFirestore } from '@infrastructure/firebase/index'

export async function getPetitionsByUser(userId: string, maxDocs = 1, lastDoc: any = null) {
	try {
		const collectionRef = firebaseFirestore.collection(PETITION_COLLECTION)
		let petitionsByUserQuery

		if (lastDoc) {
			petitionsByUserQuery = collectionRef
				.where('owner.userId', '==', userId)
				.orderBy('createdAt', 'desc')
				.limit(maxDocs)
				.startAfter(lastDoc.createdAt)
		} else {
			petitionsByUserQuery = collectionRef
				.where('owner.userId', '==', userId)
				.orderBy('createdAt', 'desc')
				.limit(maxDocs)
		}

		const petitionsSnap = await petitionsByUserQuery.get()

		const petitions = petitionsSnap.docs.map((doc) => ({
			petitionId: doc.id,
			...doc.data()
		})) as PetitionEntity[]

		return petitions
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os abaixo assinados')
	}
}
