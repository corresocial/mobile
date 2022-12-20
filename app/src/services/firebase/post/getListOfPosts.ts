import { collection, documentId, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '..'

import { PostCollection } from '../types'
import { PostIdentification } from './getPostsByLocation'

async function getListOfPosts(postsIdentification: PostIdentification[]) { // TODO Type
	try {
		if (postsIdentification.length < 1) return []

		const allPosts = postsIdentification.map(async (post: any) => { // TODO type
			const queryList = query(collection(firestore, post.collection), where(documentId(), 'in', post.postIds))
			const allCollectionDocs = await getDocs(queryList)

			const postsOfCurrentCollection = [] as any // TODO type
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

export { getListOfPosts }
