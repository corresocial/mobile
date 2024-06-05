import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'

import { PollEntity } from '@domain/poll/entity/types'

import { POLL_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

export async function getPollsByUser(userId: string, maxDocs = 1, lastDoc: PollEntity | null = null) {
	try {
		const collectionRef = collection(firestore, POLL_COLLECTION)
		let pollsByUserQuery
		if (lastDoc) {
			pollsByUserQuery = query(
				collectionRef,
				where('owner.userId', '==', userId),
				orderBy('createdAt', 'desc'),
				limit(maxDocs),
				startAfter(lastDoc.createdAt)
			)
		} else {
			pollsByUserQuery = query(
				collectionRef,
				where('owner.userId', '==', userId),
				orderBy('createdAt', 'desc'),
				limit(maxDocs),
			)
		}

		const pollsSnap = await getDocs(pollsByUserQuery)
		return pollsSnap.docs.map((doc) => ({ pollId: doc.id, ...doc.data() } as PollEntity))
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as enquetes')
	}
}
