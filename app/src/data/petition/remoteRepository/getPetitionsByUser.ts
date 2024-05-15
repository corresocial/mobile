import { collection, getDocs, limit, orderBy, query, where, startAfter } from 'firebase/firestore'

import { PetitionEntity } from '@domain/petition/entity/types'

import { PETITION_COLLECTION } from '@data/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

export async function getPetitionsByUser(userId: string, maxDocs = 1, lastDoc = null) {
	try {
		const collectionRef = collection(firestore, PETITION_COLLECTION)
		let petitionsByUserQuery
		if (lastDoc) {
			petitionsByUserQuery = query(
				collectionRef,
				where('owner.userId', '==', userId),
				orderBy('createdAt', 'desc'),
				limit(maxDocs),
				startAfter(lastDoc)
			)
		} else {
			petitionsByUserQuery = query(
				collectionRef,
				where('owner.userId', '==', userId),
				orderBy('createdAt', 'desc'),
				limit(maxDocs),
			)
		}

		const petitionsSnap = await getDocs(petitionsByUserQuery)

		const petitions = petitionsSnap.docs.map((doc) => {
			return {
				petitionId: doc.id,
				...doc.data()
			} as PetitionEntity
		})
		return petitions
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as enquetes')
	}
}
