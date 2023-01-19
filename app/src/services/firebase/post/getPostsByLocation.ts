import {
	where,
	query,
	getDocs,
	collectionGroup,
	DocumentData
} from 'firebase/firestore'
import { firestore } from '..'
import { SearchParams } from '../../maps/types'
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

async function getPostsByLocation(searchParams: SearchParams) {
	try {
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

		const queryNearby = query(
			collectionGroup(firestore, 'private'),
			where(
				'geohashNearby',
				'array-contains-any',
				searchParams.geohashes,
			)
		)

		/* const queryCity = query(
			collectionGroup(firestore, 'private'),
			where(
				'geohashNearby',
				'not-in',
				searchParams.geohashes,
			),
			where(
				'city',
				'==',
				searchParams.city
			)
		)

		const queryCountry = query(
			collectionGroup(firestore, 'private'),
			where(
				'city',
				'!=',
				searchParams.city
			),
			where(
				'country',
				'==',
				searchParams.country
			)
		) */

		const snapshotNearby = await getDocs(queryNearby)
		/* const snapshotCity = await getDocs(queryCity)
		const snapshotCountry = await getDocs(queryCountry) */

		const docs: DocumentData[] = []
		snapshotNearby.forEach((doc) => docs.push(doc))
		/* snapshotCity.forEach((doc) => docs.push(doc))
		snapshotCountry.forEach((doc) => docs.push(doc)) */

		docs.forEach((doc) => {
			const { postType } = doc.data()
			if (Object.keys(posts).includes(postType)) {
				if (!posts[postType as PostType].postIds.includes(doc.id)) {
					posts[postType as PostType].postIds.push(doc.id.replace('address', ''))
				}
			}
		})

		return Object.values(posts).filter((post: PostIdentificationItem) => !!post.postIds.length) as any[]
	} catch (err) {
		console.log(err)
		return []
	}
}

export { getPostsByLocation }
