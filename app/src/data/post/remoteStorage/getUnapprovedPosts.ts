import { collection, getDocs, limit, orderBy, query, startAfter, where } from 'firebase/firestore'

import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { firestore } from '@infrastructure/firebase/index'

export async function getUnapprovedPosts(maxDocs = 1, lastDoc: PostEntity | null = null) {
	try {
		const collectionRef = collection(firestore, POST_COLLECTION)
		let unapprovedPosts
		if (lastDoc) {
			unapprovedPosts = query(
				collectionRef,
				where('unapprovedData', '!=', false),
				orderBy('unapprovedData', 'desc'),
				limit(maxDocs),
				startAfter(lastDoc.createdAt)
			)
		} else {
			unapprovedPosts = query(
				collectionRef,
				where('unapprovedData', '!=', false),
				orderBy('unapprovedData', 'desc'),
				limit(maxDocs),
			)
		}

		const postsSnap = await getDocs(unapprovedPosts)
		return postsSnap.docs.map((doc) => ({ postId: doc.id, ...doc.data() } as PostEntity))
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter os posts não aprovados')
	}
}
