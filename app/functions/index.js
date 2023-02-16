const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.getFeedPosts = functions.https.onRequest(async (req, res) => { // req. searchParams
	try {
		console.log(req.body)
		const collectionRef = admin.firestore().collection('posts')

		const { searchParams, userId } = req.body

		const { nearbyPosts, nearPostIds } = await getNearbyPosts(collectionRef, searchParams)
		const cityPosts = await getCityPosts(collectionRef, searchParams, nearPostIds)
		const countryPosts = await getCountryPosts(collectionRef, searchParams, nearPostIds)

		const allPosts = [...nearbyPosts, ...cityPosts, ...countryPosts]
		const postsWithLocationFilter = filterLocation(allPosts, userId)

		return res.status(200).send(postsWithLocationFilter)
	} catch (err) {
		console.log(err)
		return res.status(500).send(err)
	}
})

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
	const approximateRadius = 125

	const binaryRandom = Math.round(Math.random())
	const detachmentRandom = Math.round(Math.random() * (55 - 10) + 10) / 10000000
	if (binaryRandom) {
		return (approximateRadius * detachmentRandom)
	}
	return -(approximateRadius * detachmentRandom)
}

const getNearbyPosts = async (collectionRef, searchParams) => {
	const queryNearby = collectionRef
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
			return err
		})
}

const getCityPosts = async (collectionRef, searchParams, nearPostIds = []) => {
	const queryCity = collectionRef
		.where('range', '==', 'city')
		.where('location.city', '==', searchParams.city)
		.orderBy('createdAt', 'desc')

	return queryCity.get()
		.then((snapshotCity) => {
			const posts = []

			snapshotCity.forEach((doc) => {
				if (!nearPostIds.includes(doc.id)) {
					posts.push({ ...doc.data(), postId: doc.id })
					// console.log(`City: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
				}
			})

			return posts
		})
		.catch((err) => {
			return err
		})
}

const getCountryPosts = async (collectionRef, searchParams, nearPostIds = []) => {
	const countryQuery = collectionRef
		.where('location.country', '==', searchParams.country)
		.where('range', '==', 'country')
		.where('location.city', '!=', searchParams.city) // Excepcion
		.orderBy('location.city', 'asc')
		.orderBy('createdAt', 'desc')

	return countryQuery.get()
		.then((snapshotCountry) => {
			const posts = []

			snapshotCountry.forEach((doc) => {
				if (!nearPostIds.includes(doc.id)) {
					posts.push({ ...doc.data(), postId: doc.id })
					// console.log(`Country: ${doc.data().title} - ${doc.data().range} ------- ${doc.data().postType}`)
				}
			})

			return posts
		})
}

/// ///  SearchByAlgolia
