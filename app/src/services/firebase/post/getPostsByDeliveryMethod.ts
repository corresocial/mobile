import { collection, getDocs, query, where } from 'firebase/firestore'
import { firestore } from '..'
import { SearchParams } from '../../maps/types'

import { PostCollection } from '../types'

async function getPostsByDeliveryMethod(searchParams: SearchParams) {
	const rangeOfDeliveryCollections = [
		{
			collectionName: 'services',
			rangeField: 'deliveryMethod'
		}
	]

	try {
		const allPosts = rangeOfDeliveryCollections.map(async ({ rangeField, collectionName }) => {
			const queryCity = query(
				collection(firestore, collectionName),
				where(rangeField, '==', 'city'),
				// where(city, '==', 'city'),  // City is private
			)

			/* const queryCountry = query(
				collection(firestore, collectionName),
				where(documentId(), 'in', postIds.slice(0, 10)),
				where('category', '==', filterText),
			) */

			const allCollectionDocs = await getDocs(queryCity)

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

export { getPostsByDeliveryMethod }
