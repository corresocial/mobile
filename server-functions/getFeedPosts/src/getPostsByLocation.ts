
import { Id, PostCollection, PostCollectionRequired } from '../domain/entities/post/common'
import { CollectionRef, SearchParams } from '../domain/entities/request'

const getNearbyPosts = async (collectionRef: CollectionRef, searchParams: SearchParams) => {
	const queryNearby = collectionRef
		.where('completed', '==', false)
		.where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
		.orderBy('createdAt', 'desc')

	return queryNearby.get()
		.then((snapshotNearby) => {
			const posts: PostCollection[] = []
			const nearPostIds = [] as Id[]

			snapshotNearby.forEach((doc) => {
				const docData: PostCollection = doc.data()
				posts.push({ ...docData, postId: doc.id })
				nearPostIds.push(doc.id)
				// console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
			})

			return { nearbyPosts: posts, nearPostIds }
		})
		.catch((error) => {
			console.error('Error fetching nearby posts:', error)
			return { nearbyPosts: [], nearPostIds: [] }
		})
}

const getCityPosts = async (collectionRef: CollectionRef, searchParams: SearchParams, nearPostIds = [] as Id[]) => {
	const queryCity = collectionRef
		.where('completed', '==', false)
		.where('location.city', '==', searchParams.city)
		.where('range', '==', 'city')
		.orderBy('createdAt', 'desc')

	return queryCity.get()
		.then((snapshotCity) => {
			const posts: PostCollection[] = []
			const cityPostIds = [] as Id[]

			snapshotCity.forEach((doc) => {
				if (!nearPostIds.includes(doc.id)) {
					const docData: PostCollection = doc.data()
					posts.push({ ...docData, postId: doc.id })
					cityPostIds.push(doc.id)
					// console.log(`City: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
				}
			})

			return { cityPosts: posts, cityPostIds }
		})
		.catch((error) => {
			console.error('Error fetching city posts:', error)
			return { cityPosts: [], cityPostIds: [] }
		})
}

const getCountryPosts = async (
	collectionRef: CollectionRef,
	searchParams: SearchParams,
	nearPostIds = [] as Id[],
	cityPostIds = [] as Id[]
) => {
	const countryQuery = collectionRef
		.where('completed', '==', false)
		.where('location.country', '==', searchParams.country)
		.where('range', '==', 'country')
		.orderBy('createdAt', 'desc')



	return countryQuery.get()
		.then((snapshotCountry) => {
			const posts: PostCollection[] = []

			snapshotCountry.forEach((doc) => {
				if (!nearPostIds.includes(doc.id) && !cityPostIds.includes(doc.id)) { // TODO Não precisa dos 2 arrays, só ignorar cidade na query
					const docData: PostCollection = doc.data()
					posts.push({ ...docData, postId: doc.id })
					// console.log(`Country: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
				}
			})
			return posts
		})
		.catch((error) => {
			console.error('Error fetching city posts:', error)
			return []
		})
}

const filterLocation = (posts: PostCollectionRequired[], userId: Id) => {
	return posts.map((post) => {
		let currentPost = { ...post }
		if (post.locationView === 'private' && post.owner.userId !== userId) {
			currentPost.location = {} as PostCollectionRequired['location']
		}

		if (post.locationView === 'approximate') {
			currentPost.location.coordinates = {
				latitude: currentPost.location.coordinates.latitude + getRandomDetachment(),
				longitude: currentPost.location.coordinates.longitude + getRandomDetachment()
			}
		}

		return currentPost
	})
}

const getRandomDetachment = () => {
	const approximateRadius = 400

	const binaryRandom = Math.round(Math.random())
	const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000
	if (binaryRandom) {
		return (approximateRadius * detachmentRandom)
	}
	return -(approximateRadius * detachmentRandom)
}

export { getNearbyPosts, getCityPosts, getCountryPosts, filterLocation }
