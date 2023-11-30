/* eslint-disable no-underscore-dangle */

/*
	CONFIGURE ALGOLIA_ID & ALGOLIA_KEY MANUALMENTE DE ACORDO COM O AMBIENTE
*/

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const algoliasearch = require('algoliasearch')

const { getNearbyPosts, getCityPosts, getCountryPosts, filterLocation } = require('./src/getFeedPostsBeta')
const {
	removeDuplicatesByPostId,
	spreadPostsByRange,
	getPostTypeFilter,
	getGeohashFilter,
	getRangeFilter,
	getMacroCategoryFilter,
	getCategoryFilter,
	getTagFilter,
	structurePostObject
} = require('./src/getFeedPostsBeta')

admin.initializeApp()

// getFeedPosts

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
		return res.status(500).send({
			nearby: [],
			city: [],
			country: []
		})
	}
})

/// ///  SearchByAlgolia

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
			macroCategoryFilter: '',
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
			searchFilters.macroCategoryFilter = getMacroCategoryFilter(searchParams.macroCategory)
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
						filters: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashFilter} ${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					}),
					await postsIndex.search(searchText, { // City
						filters: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND ${searchFilters.cityFilter}${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					}),
					await postsIndex.search(searchText, { // Country
						filters: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND  ${searchFilters.countryFilter}${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					})
				]
		)
			.then((responses) => responses.reduce((acc, result) => {
				if (result && result.hits && result.hits.length > 0) {
					const structuredPosts = result.hits.map((record) => {
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

/// ///  checkUserPhoneAlreadyRegistred

exports.checkUserPhoneAlreadyRegistred = functions.https.onRequest(async (req, res) => {
	const { phoneNumber } = req.body

	admin.auth()
		.getUserByPhoneNumber(phoneNumber)
		.then((userRecord) => {
			console.log(`Successfully fetched user data:  ${userRecord.toJSON()}`)
			return res.status(200).send(!!userRecord)
		})
		.catch((error) => {
			console.log('Error fetching user data:', error)
			return res.status(200).send(false)
		})
})
