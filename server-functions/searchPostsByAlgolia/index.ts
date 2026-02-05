import * as admin from 'firebase-admin'
import { onRequest, HttpsError } from 'firebase-functions/v2/https'
import algoliasearch from 'algoliasearch'
import { validateAuthToken, AuthError } from './validateAuthToken'

// Prevent "App already exists" errors
if (!admin.apps.length) {
	admin.initializeApp()
}

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

export const searchPostsByAlgolia = onRequest(async (request, response) => {
	// 1. SECURITY: Validate authentication token
	let userId: string;
	try {
		const auth = await validateAuthToken(request);
		userId = auth.uid;
		console.log(`Authenticated user: ${userId}`);
	} catch (error) {
		if (error instanceof AuthError) {
			response.status(401).json({
				error: error.message,
				code: error.code
			});
			return;
		}
		response.status(401).json({ error: 'Authentication failed' });
		return;
	}

	try {
		// 2. INPUT: Get data from request body
		const { searchText, searchParams, searchByRange }: RequestBody = request.body

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
				// Check strictly for boolean false since we used short-circuiting (&&) above
				if (result && typeof result !== 'boolean' && result.hits && result.hits.length > 0) {
					const structuredPosts = result.hits.map((record) => {
						const postData = structurePostObject(record)
						return postData
					})
					return [...acc, ...structuredPosts]
				}
				return acc
			}, []))

		const postsWithLocationFilter = filterLocation(results as PostCollectionRequired[], userId)
		const filteredPosts = removeDuplicatesByPostId(postsWithLocationFilter)

		const postsByRange = spreadPostsByRange(filteredPosts)

		// 3. RETURN: Return data with HTTP response
		response.status(200).json(postsByRange)

	} catch (err) {
		console.error('Error searching Algolia:', err)
		response.status(500).json({
			error: 'Unable to search posts',
			code: 'internal'
		})
	}
})