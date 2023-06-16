/* eslint-disable no-underscore-dangle */
import { FeedPosts, PostCollection, PostCollectionRemote } from '../firebase/types'
import { SearchParams } from '../maps/types'
import { postsIndex } from './index'

async function searchPosts(searchText: string, searchParams: SearchParams) {
	try {
		const searchFilters = {
			cityFilter: '',
			countryFilter: '',
			postTypeFilter: '',
			geohashFilter: '',
			geohashExceptionFilter: '',
			categoryFilter: '',
			tagFilter: '',
		}

		const searchOnly = false

		if (!searchOnly) {
			const geohashField = searchParams.range === 'nearby' ? 'geohashNearby' : 'geohashCity'
			searchFilters.postTypeFilter = getPostTypeFilter(searchParams.postType)
			searchFilters.geohashFilter = getGeohashFilter(searchParams.geohashes, geohashField)
			searchFilters.geohashExceptionFilter = getGeohashFilter(searchParams.geohashes, geohashField, true)
			searchFilters.cityFilter = getRangeFilter('city', searchParams.city, searchParams.country)
			searchFilters.countryFilter = getRangeFilter('country', searchParams.country, searchParams.country)
			searchFilters.categoryFilter = getCategoryFilter(searchParams.category)
			searchFilters.tagFilter = getTagFilter(searchParams.tag)
		}

		const results = await Promise.all([
			await postsIndex.search(searchText, { // Near
				filters: searchOnly
					? ''
					: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
			}),
			await postsIndex.search(searchText, { // City
				filters: searchOnly
					? ''
					: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND ${searchFilters.cityFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
			}),
			await postsIndex.search(searchText, { // Country
				filters: searchOnly
					? ''
					: `${searchFilters.postTypeFilter} AND ${searchFilters.geohashExceptionFilter} AND  ${searchFilters.countryFilter}${searchFilters.categoryFilter}${searchFilters.tagFilter}`
			})
		])
			.then((responses) => responses.reduce((acc: any, result: any) => {
				if (result.hits.length > 0) {
					const structuredPosts: any[] = result.hits.map((record: any, index: number) => {
						const postData = structurePostObject(record)
						return postData
					})

					return [...acc, ...structuredPosts]
				}
				return acc
			}, []),)

		results.forEach((post: any) => console.log(`${post.title} - ${post.postType} - ${post.range}`))

		return spreadPostsByRange(results) as FeedPosts
	} catch (err) {
		console.log(err)
		console.log('Erro ao buscar posts no algolia, file:searchPosts')
		return []
	}
}

interface FilteredPosts {
	nearby: PostCollectionRemote[];
	city: PostCollectionRemote[];
	country: PostCollectionRemote[];
}

const spreadPostsByRange = (posts: PostCollectionRemote[]) => {
	const result: FilteredPosts = {
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

const getPostTypeFilter = (postType: string) => {
	return `postType:${postType}`
}

const getGeohashFilter = (geohashes: string[], geohashField: string, negativeClause?: boolean) => {
	return geohashes.reduce((query, geohash) => {
		if (geohash === geohashes[geohashes.length - 1]) {
			return `(${query}${negativeClause ? 'NOT' : ''}location.${geohashField}:${geohash})`
		}
		return `${query}${negativeClause ? 'NOT' : ''} location.${geohashField}:${geohash} OR `
	}, '')
}

const getRangeFilter = (range: string, city: string, country: string) => { // TODO Type
	if (range === 'nearby' || range === 'city') return `range:city AND location.city:'${city}'`
	if (range === 'country') return `range:${range} AND location.country:'${country}'`
	return ''
}

const getCategoryFilter = (category: string) => {
	if (!category) return ''
	return ` AND category:${category}`
}

const getTagFilter = (tag: string) => {
	if (!tag) return ''
	return ` AND tags:${tag}`
}

const structurePostObject = (record: any) => {
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

export { searchPosts }
