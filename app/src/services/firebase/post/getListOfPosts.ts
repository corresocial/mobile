import { collection, documentId, getDocs, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '..'

import { PostCollection } from '../types'
import { PostIdentificationItem } from './getPostsByLocation'

type FilterMethod = 'category' | 'tags'

async function getListOfPosts(postsIdentification: PostIdentificationItem[], filterMethod?: FilterMethod, filterText?: string) {
	try {
		if (postsIdentification.length < 1) return []

		const allPosts = postsIdentification.map(async (post: PostIdentificationItem) => {
			const queryList = filterMethod
				? getFilteredQuery(post.collection, post.postIds, filterMethod, filterText)
				: query(
					collection(firestore, post.collection),
					where(documentId(), 'in', post.postIds),
				)

			const allCollectionDocs = await getDocs(queryList)

			const postsOfCurrentCollection = [] as PostCollection[]
			allCollectionDocs.forEach((doc) => {
				postsOfCurrentCollection.push({ ...doc.data(), postId: doc.id })
			})

			return postsOfCurrentCollection as PostCollection[]
		})

		return Promise.all(allPosts)
	} catch (e) {
		console.log(e)
		return [] as PostCollection[]
	}
}

const getFilteredQuery = (collectionName: any, postIds: any, filterMethod: FilterMethod, filterText: string = '') => {
	if (filterMethod === 'category') {
		return query(
			collection(firestore, collectionName),
			where(documentId(), 'in', postIds),
			where('category', '==', filterText)
		)
	}
	return query(
		collection(firestore, collectionName),
		where(documentId(), 'in', postIds),
		where('tags', 'array-contains', filterText)
	)
}

export { getListOfPosts }
