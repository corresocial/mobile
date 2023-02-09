import { servicesIndex } from './index'
import { PostIdentification } from './types'

async function searchPosts(searchText: string, searchParams: any, searchOnly?: boolean) {
	const searchFilters = {
		rangeFilter: '',
		postTypeFilter: '',
		geohashFilter: '',
		locationViewFilter: ''
	}

	if (!searchOnly) {
		const geoKey = searchParams.range === 'nearby' ? 'geohashNearby' : 'geohashCity'
		searchFilters.rangeFilter = getRangeFilter(searchParams.range, searchParams.city, searchParams.country)
		searchFilters.postTypeFilter = getPostTypeFilter(searchParams.postType)
		searchFilters.geohashFilter = getGeohashFilter(searchParams.geohashes, geoKey)
	}

	if (searchParams.range !== 'country') {
		const results = await servicesIndex.search(searchText, {
			filters: searchOnly
				? ''
				: `${searchFilters.rangeFilter}${searchFilters.postTypeFilter}${searchFilters.geohashFilter}${searchFilters.locationViewFilter}`
		})

		if (results.hits.length > 0) {
			const records = results.hits.map((record: any, index: number) => {
				return {
					collection: record.path.split('/')[0],
					postIds: record.objectID.replace('address', '')
				} as PostIdentification
			})

			const filtredRecords = filterInvalidArrayItems(records)
			return filtredRecords
		}
		return [] as PostIdentification[]
	}
	console.log('Busca por localização de país não implementada')
	return []
}

const getRangeFilter = (range: string, city: string, country: string) => {
	if (range === 'nearby' || range === 'city') return `city:"${city}"`
	if (range === 'country') return `country:"${country}"`
	return ''
}

const getPostTypeFilter = (postType: string) => {
	switch (postType) {
		case 'service': return ' ' /* AND postType:service */
		case 'any': return ' '
		default: return ''
	}
}

const getGeohashFilter = (geohashes: string[], geoKey: string) => {
	return geohashes.reduce((query, geohash) => {
		if (geohash === geohashes[geohashes.length - 1]) {
			return `AND (${query} ${geoKey}:${geohash})`
		}
		return `${query} ${geoKey}:${geohash} OR`
	}, '')
}

const filterInvalidArrayItems = (records: PostIdentification[]) => {
	return records.filter((record) => !!record)
}

export { searchPosts }
