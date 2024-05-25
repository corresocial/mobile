import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'

import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

export async function getPostsByUser(userId: string, maxDocs = 10, lastDoc: PostEntity | null = null) {
	try {
		const collectionRef = collection(firestore, POST_COLLECTION)
		let postsByUserQuery
		if (lastDoc) {
			postsByUserQuery = query(
				collectionRef,
				where('owner.userId', '==', userId),
				orderBy('createdAt', 'desc'),
				limit(maxDocs),
				startAfter(lastDoc.createdAt)
			)
		} else {
			postsByUserQuery = query(
				collectionRef,
				where('owner.userId', '==', userId),
				orderBy('createdAt', 'desc'),
				limit(maxDocs),
			)
		}

		const postsSnap = await getDocs(postsByUserQuery)
		return postsSnap.docs.map((doc) => ({ postId: doc.id, ...doc.data() } as PostEntity))
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as postagens')
	}
}
