/* eslint-disable no-underscore-dangle */
const removeDuplicatesByPostId = (results) => {
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

const getMacroCategoryFilter = (macroCategory) => {
	if (!macroCategory) return ''
	if (macroCategory === 'income') {
		return ` AND (macroCategory:${macroCategory} OR macroCategory:sale OR macroCategory:service OR macroCategory:vacancy)`
	}
	return ` AND macroCategory:${macroCategory}`
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

export {
	removeDuplicatesByPostId,
	spreadPostsByRange,
	getPostTypeFilter,
	getGeohashFilter,
	getRangeFilter,
	getMacroCategoryFilter,
	getCategoryFilter,
	getTagFilter,
	structurePostObject
}
