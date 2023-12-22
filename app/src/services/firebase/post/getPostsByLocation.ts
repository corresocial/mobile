import {
	where,
	query,
	getDocs,
	DocumentData,
	collection,
	orderBy,
	CollectionReference,
} from 'firebase/firestore'

import { SearchParams } from '../../maps/types'

import { firestore } from '@services/firebase'

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
		const collectionRef = collection(firestore, 'posts')

		const { nearbyPosts, nearPostIds } = await getNearbyPosts(collectionRef, searchParams)
		const { cityPosts, cityPostIds } = await getCityPosts(collectionRef, searchParams, nearPostIds)
		const countryPosts = await getCountryPosts(collectionRef, searchParams, nearPostIds, cityPostIds)

		return {
			nearby: nearbyPosts,
			city: cityPosts,
			country: countryPosts
		}
	} catch (err) {
		console.log(err)
		return {
			nearby: [],
			city: [],
			country: []
		}
	}
}

const getNearbyPosts = async (collectionRef: CollectionReference<DocumentData>, searchParams: SearchParams) => {
	const posts: any = []
	const nearPostIds: string[] = []

	const queryNearby = query(
		collectionRef,
		where('completed', '==', false),
		where('location.geohashNearby', 'array-contains-any', searchParams.geohashes),
		orderBy('createdAt', 'desc')
	)

	const snapshotNearby = await getDocs(queryNearby)

	snapshotNearby.forEach((doc) => {
		posts.push({ ...doc.data(), postId: doc.id })
		nearPostIds.push(doc.id)
		// console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
	})

	return { nearbyPosts: posts, nearPostIds }
}

const getCityPosts = async (collectionRef: CollectionReference<DocumentData>, searchParams: SearchParams, nearPostIds: string[] = []) => {
	const posts: any = []
	const cityPostIds: string[] = []

	const queryCity = query(
		collectionRef,
		where('completed', '==', false),
		where('location.city', '==', searchParams.city),
		where('range', '==', 'city'),
		orderBy('createdAt', 'desc')
	)

	const snapshotCity = await getDocs(queryCity)

	snapshotCity.forEach((doc) => {
		if (!nearPostIds.includes(doc.id)) {
			posts.push({ ...doc.data(), postId: doc.id })
			cityPostIds.push(doc.id)
			// console.log(`City: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
		}
	})

	return { cityPosts: posts, cityPostIds }
}

const getCountryPosts = async (
	collectionRef: CollectionReference<DocumentData>,
	searchParams: SearchParams,
	nearPostIds: string[] = [],
	cityPostIds: string[] = []
) => {
	const posts: any = []

	const countryQuery = query(
		collectionRef,
		where('completed', '==', false),
		where('location.country', '==', searchParams.country),
		where('range', '==', 'country'),
		orderBy('createdAt', 'desc')
	)

	const snapshotCountry = await getDocs(countryQuery)

	snapshotCountry.forEach((doc) => {
		if (!nearPostIds.includes(doc.id) && !cityPostIds.includes(doc.id)) {
			posts.push({ ...doc.data(), postId: doc.id })
			// console.log(`Country: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
		}
	})

	return posts
}

export { getPostsByLocation }
