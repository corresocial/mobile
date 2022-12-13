import { postsIndex } from './index'

async function searchPosts(text: string, searchParams: any) {
	let geoKey: string

	const searchConfig = {
		range: 'nearby',
		rangeFilter: '',
		type: 'service',
		typeFilter: '',
		city: 'Londrina',
		country: 'Brasil',
		geohashNearby: ['6gge7d', '6gge7e', '6gge7g', '6gge7f', '6gge7c', '6gge79', '6gge73', '6gge76', '6gge77']
	}

	if (searchConfig.range === 'nearby') {
		geoKey = 'geohashNearby'
		searchConfig.rangeFilter = `(locationView:public AND owner.address.city:${searchConfig.city})`
	} else if (searchConfig.range === 'city') {
		geoKey = 'geohashCity'
		searchConfig.rangeFilter = `(locationView:public AND owner.address.city:${searchConfig.city})`
	} else if (searchConfig.range === 'country') {
		geoKey = 'geohashCountry'
		searchConfig.rangeFilter = `(locationView:public AND owner.address.country:${searchConfig.country})`
	}

	if (searchConfig.type === 'job') {
		searchConfig.typeFilter = 'AND postType:job'
	} else if (searchConfig.type === 'service') {
		searchConfig.typeFilter = 'AND postType:service'
	} else if (searchConfig.type === 'commerce') {
		searchConfig.typeFilter = 'AND postType:commerce'
	} else {
		searchConfig.typeFilter = ''
	}

	const geohashFilter = searchConfig.geohashNearby?.reduce((aux, geohash) => {
		if (aux === searchConfig.geohashNearby[0]) {
			return `private.address.${geoKey}:${aux} OR`
		}
		if (geohash === searchConfig.geohashNearby[searchConfig.geohashNearby.length - 1]) {
			return `(${aux} private.address.${geoKey}:${geohash})`
		}
		return `${aux} private.address.${geoKey}:${geohash} OR`
	})

	if (searchConfig.range !== 'country') {
		const results = await Promise.all([
			postsIndex.search(text, {
				filters: geohashFilter + searchConfig.typeFilter,
			}),
			postsIndex.search(text, {
				filters: searchConfig.rangeFilter + searchConfig.typeFilter,
			}),
		]).then((responses) => responses.reduce((acc: any, result: any) => {
			if (result.hits.length > 0) {
				return [...acc, ...result.hits].filter(
					(item, index, self) => index === self.findIndex((t) => t.objectID === item.objectID),
				)
			}
			return acc
		}, []))
		return results
	}
	return Promise.all([
		postsIndex.search(text, {
			filters: searchConfig.rangeFilter,
		}),
	]).then((responses) => responses[0].hits)
}

export { searchPosts }
