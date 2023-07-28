/* eslint-disable no-underscore-dangle */

/*
	CONFIGURE ALGOLIA_ID & ALGOLIA_KEY MANUALMENTE DE ACORDO COM O AMBIENTE
*/

const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

exports.getFeedPostsBeta = functions.https.onRequest(async (req, res) => { // req. searchParams
	try {
		const collectionRef = admin.firestore().collection('posts')

		const { searchParams, userId } = req.body

		const { nearbyPosts, nearPostIds } = await getNearbyPosts(collectionRef, searchParams)
		const { cityPosts, cityPostIds } = await getCityPosts(collectionRef, searchParams, nearPostIds)
		const countryPosts = await getCountryPosts(collectionRef, searchParams, nearPostIds, cityPostIds)

		const postsWithLocationFilter = {
			nearby: filterLocation(nearbyPosts, userId),
			city: filterLocation(cityPosts, userId),
			country: filterLocation(countryPosts, userId)
		}

		return res.status(200).send(postsWithLocationFilter)
	} catch (err) {
		console.log(err)
		return res.status(500).send(err)
	}
})

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
		.where('location.city', '==', searchParams.city)
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
		.where('location.country', '==', searchParams.country)
		.where('range', '==', 'country')
		.orderBy('createdAt', 'desc')

	return countryQuery.get()
		.then((snapshotCountry) => {
			const posts = []

			snapshotCountry.forEach((doc) => {
				if (!nearPostIds.includes(doc.id) || !cityPostIds.includes(doc.id)) {
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

/// ///  SearchByAlgolia

const algoliasearch = require('algoliasearch')

const client = algoliasearch('ALGOLIA_ID', 'ALGOLIA_KEY')
const postsIndex = client.initIndex('postsIndex')

exports.searchPostsByAlgoliaBeta = functions.https.onRequest(async (req, res) => {
	try {
		const { searchText, searchParams, searchByRange, userId } = req.body

		const searchFilters = {
			cityFilter: '',
			countryFilter: '',
			postTypeFilter: '',
			geohashFilter: '',
			geohashExceptionFilter: '',
			categoryFilter: '',
			tagFilter: '',
		}

		if (searchByRange) {
			const geohashField = 'geohashNearby'
			searchFilters.geohashFilter = searchParams.range === 'near' ? getGeohashFilter(searchParams.geohashes, geohashField) : ''
			searchFilters.cityFilter = searchParams.range === 'city' ? getRangeFilter('city', searchParams.city, searchParams.country) : ''
			searchFilters.countryFilter = searchParams.range === 'country' ? getRangeFilter('country', searchParams.country, searchParams.country) : ''
		} else {
			const geohashField = 'geohashNearby'
			searchFilters.postTypeFilter = getPostTypeFilter(searchParams.postType)
			searchFilters.geohashFilter = getGeohashFilter(searchParams.geohashes, geohashField)
			searchFilters.geohashExceptionFilter = getGeohashFilter(searchParams.geohashes, geohashField, true)
			searchFilters.cityFilter = getRangeFilter('city', searchParams.city, searchParams.country)
			searchFilters.countryFilter = getRangeFilter('country', searchParams.country, searchParams.country)
			searchFilters.categoryFilter = getCategoryFilter(searchParams.category)
			searchFilters.tagFilter = getTagFilter(searchParams.tag)
		}

		const results = await Promise.all(
			searchByRange
				? [
					searchParams.range === 'near' && await postsIndex.search(searchText, { // Near
						filters: searchFilters.geohashFilter
					}),
					searchParams.range === 'city' && await postsIndex.search(searchText, { // City
						filters: searchFilters.cityFilter
					}),
					searchParams.range === 'country' && await postsIndex.search(searchText, { // Country
						filters: searchFilters.countryFilter
					})
				]
				: [
					await postsIndex.search(searchText, { // Near
						filters: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					}),
					await postsIndex.search(searchText, { // City
						filters: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND ${searchFilters.cityFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					}),
					await postsIndex.search(searchText, { // Country
						filters: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND  ${searchFilters.countryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					})
				]
		)
			.then((responses) => responses.reduce((acc, result) => {
				if (result && result.hits && result.hits.length > 0) {
					const structuredPosts = result.hits.map((record, index) => {
						const postData = structurePostObject(record)
						return postData
					})
					return [...acc, ...structuredPosts]
				}
				return acc
			}, []),)

		const postsWithLocationFilter = filterLocation(results, userId)
		const filteredPosts = removeDuplicatesByPostId(postsWithLocationFilter)

		const postsByRange = spreadPostsByRange(filteredPosts)

		return res.status(200).send(postsByRange)
	} catch (err) {
		console.log(err)
		console.log('Erro ao buscar posts no algolia, file:searchPosts')
		return res.status(500).send(err)
	}
})

function removeDuplicatesByPostId(results) {
	return results.filter((post, index, self) => index === self.findIndex((p) => p.postId === post.postId))
}

const spreadPostsByRange = (posts) => {
	const result = {
		nearby: [],
		city: [],
		country: []
	}

	posts.forEach((post) => {
		if (post.range === 'near') {
			result.nearby.push(post)
		} else if (post.range === 'city') {
			result.city.push(post)
		} else if (post.range === 'country') {
			result.country.push(post)
		}
	})

	return result
}

const getPostTypeFilter = (postType) => {
	return `postType:${postType}`
}

const getGeohashFilter = (geohashes, geohashField, negativeClause) => {
	return geohashes.reduce((geohashQuery, geohash) => {
		if (geohash === geohashes[geohashes.length - 1]) {
			return `(${geohashQuery}${negativeClause ? 'NOT' : ''}location.${geohashField}:${geohash})`
		}
		return `${geohashQuery}${negativeClause ? 'NOT' : ''} location.${geohashField}:${geohash} OR `
	}, '')
}

const getRangeFilter = (range, city, country) => {
	if (range === 'nearby' || range === 'city') return ` (range:city OR range:country) AND location.city:'${city}'`
	if (range === 'country') return `range:${range} AND location.country:'${country}'`
	return ''
}

const getCategoryFilter = (category) => {
	if (!category) return ''
	return ` AND category:${category}`
}

const getTagFilter = (tag) => {
	if (!tag) return ''
	return ` AND tags:${tag}`
}

const structurePostObject = (record) => {
	const structuredPost = {
		...record,
		postId: record.objectID,
	}
	delete structuredPost.path
	delete structuredPost.objectID
	delete structuredPost.lastmodified
	delete structuredPost._highlightResult

	return structuredPost
}
