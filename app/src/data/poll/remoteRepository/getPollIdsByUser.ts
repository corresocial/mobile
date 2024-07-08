import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

export async function getPollIdsByUser(userId: string) {
	try {
		const collectionRef = collection(firestore, POLL_COLLECTION)
		const pollsByUserQuery = query(
			collectionRef,
			where('owner.userId', '==', userId),
			orderBy('createdAt', 'desc'),
		)
		const pollsSnap = await getDocs(pollsByUserQuery)
		return pollsSnap.docs.map((doc) => doc.id)
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as enquetes')
	}
}
