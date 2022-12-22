import {
	where,
	query,
	getDocs,
	collectionGroup,
} from 'firebase/firestore'
import { firestore } from '..'
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

async function getNearPostsIdsByPostType(geohashes: string[], postTypeParam: PostType) {
	try {
		const privateAddresses = query(
			collectionGroup(firestore, 'private'),
			where(
				'postType',
				'==',
				postTypeParam
			),
			where(
				'geohashNearby',
				'array-contains-any',
				geohashes,
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
			if (Object.keys(posts).includes(postType)) {
				posts[postType as PostType].postIds.push(doc.id.replace('address', ''))
			}
		})

		return Object.values(posts).filter((post: PostIdentificationItem) => !!post.postIds.length) as any[]
	} catch (err) {
		console.log(err)
		return []
	}
}

export { getNearPostsIdsByPostType }
