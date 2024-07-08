import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

import { PETITION_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

export async function getPetitionIdsByUser(userId: string) {
	try {
		const collectionRef = collection(firestore, PETITION_COLLECTION)
		const petitionsByUserQuery = query(
			collectionRef,
			where('owner.userId', '==', userId),
			orderBy('createdAt', 'desc'),
		)
		const petitionsSnap = await getDocs(petitionsByUserQuery)
		return petitionsSnap.docs.map((doc) => doc.id)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os abaixo assinados')
	}
}
