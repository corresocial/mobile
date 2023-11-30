const getNearbyPosts = async (collectionRef, searchParams) => {
	const queryNearby = collectionRef
		.where('completed', '==', false)
		.where('location.geohashNearby', 'array-contains-any', searchParams.geohashes)
		.orderBy('createdAt', 'desc')

	return queryNearby.get()
		.then((snapshotNearby) => {
			const posts = []
			const nearPostIds = []

			snapshotNearby.forEach((doc) => {
				posts.push({ ...doc.data(), postId: doc.id })
				nearPostIds.push(doc.id)
				// console.log(`Nearby: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
			})

			return { nearbyPosts: posts, nearPostIds }
		})
		.catch((err) => {
			return []
		})
}

const getCityPosts = async (collectionRef, searchParams, nearPostIds = []) => {
	const queryCity = collectionRef
		.where('completed', '==', false)
		.where('location.city', '==', searchParams.city)
		.where('range', '==', 'city')
		.orderBy('createdAt', 'desc')

	return queryCity.get()
		.then((snapshotCity) => {
			const posts = []
			const cityPostIds = []

			snapshotCity.forEach((doc) => {
				if (!nearPostIds.includes(doc.id)) {
					posts.push({ ...doc.data(), postId: doc.id })
					cityPostIds.push(doc.id)
					// console.log(`City: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
				}
			})

			return { cityPosts: posts, cityPostIds }
		})
		.catch((err) => {
			console.log(err)
			return []
		})
}

const getCountryPosts = async (
	collectionRef,
	searchParams,
	nearPostIds = [],
	cityPostIds = []
) => {
	const countryQuery = collectionRef
		.where('completed', '==', false)
		.where('location.country', '==', searchParams.country)
		.where('range', '==', 'country')
		.orderBy('createdAt', 'desc')

	return countryQuery.get()
		.then((snapshotCountry) => {
			const posts = []

			snapshotCountry.forEach((doc) => {
				if (!nearPostIds.includes(doc.id) && !cityPostIds.includes(doc.id)) {
					posts.push({ ...doc.data(), postId: doc.id })
					// console.log(`Country: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
				}
			})

			return posts
		})
}

const filterLocation = (posts, userId) => {
	return posts.map((post) => {
		const currentPost = { ...post }
		if (post.locationView === 'private' && post.owner.userId !== userId) {
			delete currentPost.location
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
