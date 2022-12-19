import {
	where,
	query,
	collection,
	orderBy,
	limit,
	getDocs,
} from 'firebase/firestore'
import firebase, { firestore } from '..'

async function getPostsByLocation() {
	const searchParams = {
		range: 'nearby',
		city: 'Novo Horizonte do Oeste',
		country: 'Brasil',
		postType: 'any',
		geohashes: ['6tgvmh', '6tgvmj', '6tgvmm', '6tgvmk', '6tgvm7', '6tgvm5', '6tgvkg', '6tgvku', '6tgvkv']
	}

	const collectionRef = collection(firestore, 'services', 'U9nNCcxORWgVQnGl1XSj', 'private')
	const subCollectionQuery = query(
		collectionRef,
		where(
			'geohashNearby',
			'array-contains-any',
			searchParams.geohashes,
		),
		limit(10),
	)

	const allSubCollectionDocs = await getDocs(subCollectionQuery)

	allSubCollectionDocs.forEach((doc) => {
		console.log(doc.id)
	})

	/* const collections = ['services', 'sales', 'vacancies', 'cultures', 'socialImpacts']
	const docsIdentification = collections.map(async (collectionName) => {
		const docCollections = collection(firestore, collectionName)
		const collectionsQuery = query(
			docCollections,
			where('locationView', '!=', 'private')
		)
		const allCollectionDocs = await performQuery(collectionsQuery)

		allCollectionDocs.forEach(async (doc: any) => {
			const collectionRef = collection(firestore, collectionName, `${doc.id}`, 'private')
			const subCollectionQuery = query(
				collectionRef,
				where(
					'geohashNearby',
					'array-contains-any',
					searchParams.geohashes,
				),
				limit(10),
			)

			const allSubCollectionDocs = await getDocs(subCollectionQuery)
			const docIds = []
			allSubCollectionDocs.forEach((doc: any) => {
				docIds.push({
					docId: doc.id,
					collection: collectionName
				})
			})

			return docIds
		})
	}) */

	return []
}

const performQuery = async (q: any) => {
	const allCollectionDocs = await getDocs(q)
	return allCollectionDocs
}

export { getPostsByLocation }
