import {
	where,
	query,
	collection,
	orderBy,
	limit,
	getDocs,
	collectionGroup,
} from 'firebase/firestore'
import Firebase, { firestore } from '..'
import { AlgoliaSearchParams } from '../../maps/types'
import { PostType } from '../types'

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

async function getPostsByLocation(searchParams: AlgoliaSearchParams) {
	const privateAddresses = query(
		collectionGroup(firestore, 'private'),
		where(
			'geohashNearby',
			'array-contains-any',
			searchParams.geohashes,
		)
	)
	const querySnapshot = await getDocs(privateAddresses)
	const posts: PostIdentification = {
		service: {
			collection: 'services',
			postIds: []
		},
		sale: {
			collection: 'sales',
			postIds: []
		},
		vacancy: {
			collection: 'vacancies',
			postIds: []
		},
		socialImpact: {
			collection: 'socialImpacts',
			postIds: []
		},
		culture: {
			collection: 'cultures',
			postIds: []
		},
	}

	querySnapshot.forEach((doc) => {
		const { postType } = doc.data()
		posts[postType as PostType].postIds.push(doc.id.replace('address', ''))
	})

	return Object.values(posts).filter((post: PostIdentificationItem) => !!post.postIds.length) as any[]
}

export { getPostsByLocation }
