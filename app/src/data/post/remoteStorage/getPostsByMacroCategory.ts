import { collection, getDocs, orderBy, query, where, Timestamp } from 'firebase/firestore'

import { PostEntity } from '@domain/post/entity/types'

import { POST_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { MacroCategoriesType } from '@utils/postMacroCategories/types'

import { firestore } from '@infrastructure/firebase/index'

export async function getPostsByMacroCategory(macroCategory: MacroCategoriesType, maxDocs = 10, lastDoc: PostEntity | null = null, allPosts = false) {
	try {
		const test = new Date()
		const start = new Date(test.getFullYear(), test.getMonth(), 1)
		const end = new Date(test.getFullYear(), test.getMonth() + 1, 0)
		const collectionRef = collection(firestore, POST_COLLECTION)
		const postsByMacroCategoryQuery = query(
			collectionRef,
			where('macroCategory', '==', macroCategory),
			where('startDate', '>=', Timestamp.fromDate(start)),
			where('startDate', '<=', Timestamp.fromDate(end)),
			orderBy('startDate', 'desc'),
		)

		// console.log(start, '<- start')
		// console.log(end, '<- end')
		// console.log(start.getTime(), end.getTime(), '<- tests')

		const postsSnap = await getDocs(postsByMacroCategoryQuery)
		return postsSnap.docs.map((doc) => ({ postId: doc.id, ...doc.data() } as PostEntity))
	} catch (error) {
		console.log(error)
		throw new Error('Houve um erro ao tentar obter as postagens')
	}
}
