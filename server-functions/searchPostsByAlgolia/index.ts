import admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import algoliasearch from 'algoliasearch'

admin.initializeApp()

const ALGOLIA_ID = process.env.ALGOLIA_ID as string
const ALGOLIA_KEY = process.env.ALGOLIA_KEY as string
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_KEY)

const postsIndex = client.initIndex('postsIndex')

import {
	removeDuplicatesByPostId,
	spreadPostsByRange,
	getPostCompletedFilter,
	getPostTypeFilter,
	getGeohashFilter,
	getRangeFilter,
	getMacroCategoryFilter,
	getCategoryFilter,
	getTagFilter,
	structurePostObject,
	filterLocation
} from './src/searchFilters'

import { RequestBody } from './domain/entities/request'
import { PostCollection, PostCollectionRequired } from './domain/entities/post/common'

exports.searchPostsByAlgolia = functions.https.onRequest(async (req: functions.https.Request, res: functions.Response | any) => {
	try {
		const { searchText, searchParams, searchByRange, userId }: RequestBody = req.body

		const searchFilters = {
			completedFilter: '',
			cityFilter: '',
			countryFilter: '',
			postTypeFilter: '',
			geohashFilter: '',
			geohashExceptionFilter: '',
			macroCategoryFilter: '',
			categoryFilter: '',
			tagFilter: '',
		}

		searchFilters.completedFilter = getPostCompletedFilter()

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
						filters: `${searchFilters.completedFilter}${searchFilters.geohashFilter}`
					}),
					searchParams.range === 'city' && await postsIndex.search(searchText, { // City
						filters: `${searchFilters.completedFilter}${searchFilters.cityFilter}`
					}),
					searchParams.range === 'country' && await postsIndex.search(searchText, { // Country
						filters: `${searchFilters.completedFilter}${searchFilters.countryFilter}`
					})
				]
				: [
					await postsIndex.search(searchText, { // Near
						filters: `${searchFilters.completedFilter}${searchFilters.postTypeFilter} AND ${searchFilters.geohashFilter} ${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					}),
					await postsIndex.search(searchText, { // City
						filters: `${searchFilters.completedFilter}${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND ${searchFilters.cityFilter}${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					}),
					await postsIndex.search(searchText, { // Country
						filters: `${searchFilters.completedFilter}${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND  ${searchFilters.countryFilter}${searchFilters.macroCategoryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
					})
				]
		)
			.then((responses) => responses.reduce((acc: PostCollection[], result) => {
				if (result && result.hits && result.hits.length > 0) {
					const structuredPosts = result.hits.map((record) => {
						const postData = structurePostObject(record)
						return postData
					})
					return [...acc, ...structuredPosts]
				}
				return acc
			}, []),)

		const postsWithLocationFilter = filterLocation(results as PostCollectionRequired[], userId)
		const filteredPosts = removeDuplicatesByPostId(postsWithLocationFilter)

		const postsByRange = spreadPostsByRange(filteredPosts)

		return res.status(200).send(postsByRange)
	} catch (err) {
		console.log(err)
		console.log('Erro ao buscar posts no algolia, file:searchPosts')
		return res.status(500).send(err)
	}
})