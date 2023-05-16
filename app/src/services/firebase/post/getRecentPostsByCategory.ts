import {
	where,
	query,
	collection,
	orderBy,
	getDocs,
} from 'firebase/firestore'
import { firestore } from '..'
import { PostCollection, PostCollectionType } from '../types'

export type PostIdentificationItem = {
	collection: string
	postIds: string[]
}

export type PostIdentification = {
	service: PostIdentificationItem
	sale: PostIdentificationItem
	vacancy: PostIdentificationItem
	socialImpact: PostIdentificationItem
	culture: PostIdentificationItem
}

async function getRecentPostsByCategory(collectionName: PostCollectionType, category: string) {
	try {
		const collectionRef = collection(firestore, collectionName)
		const categoryPosts = query(
			collectionRef,
			where(
				'category',
				'==',
				category,
			),
			orderBy('createdAt', 'desc'),
		)
		const querySnapshot = await getDocs(categoryPosts)

		const posts: PostCollection[] = []
		querySnapshot.forEach((doc) => {
			posts.push({ postId: doc.id, ...doc.data() })
		})
		return posts as PostCollection[]
	} catch (err) {
		console.log(err)
		return [] as PostCollection[]
	}
}

export { getRecentPostsByCategory }
