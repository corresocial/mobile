import { Id, MacroCategoriesType, PostCollection, PostCollectionRequired, PostRange, PostType } from "../domain/entities/post/common"
import { GeohashField, Geohashes, SearchRange } from "../domain/entities/request"

const removeDuplicatesByPostId = (results: PostCollection[]) => {
	return results.filter((post: PostCollection, index: number, self: PostCollection[]) => index === self.findIndex((p: PostCollection) => p.postId === post.postId))
}

const spreadPostsByRange = (posts: PostCollection[]) => {
	const result = {
		nearby: [] as PostCollection[],
		city: [] as PostCollection[],
		country: [] as PostCollection[]
	}

	posts.forEach((post: PostCollection) => {
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

const getPostCompletedFilter = () => {
	return '(completed:false) AND '
}

const getPostTypeFilter = (postType: PostType) => {
	return `postType:${postType}`
}

const getGeohashFilter = (geohashes: Geohashes, geohashField: GeohashField, negativeClause?: boolean) => {
	return geohashes.reduce((geohashQuery: string, geohash: string) => {
		if (geohash === geohashes[geohashes.length - 1]) {
			return `(${geohashQuery}${negativeClause ? 'NOT' : ''}location.${geohashField}:${geohash})`
		}
		return `${geohashQuery}${negativeClause ? 'NOT' : ''} location.${geohashField}:${geohash} OR `
	}, '')
}

const getRangeFilter = (range: SearchRange, city: string, country: string) => {
	if (range === 'nearby' || range === 'city') return ` (range:city OR range:country) AND location.city:'${city}'`
	if (range === 'country') return `range:${range} AND location.country:'${country}'`
	return ''
}

const getMacroCategoryFilter = (macroCategory: MacroCategoriesType) => {
	if (!macroCategory) return ''
	return ` AND macroCategory:${macroCategory}`
}

const getCategoryFilter = (category: string) => {
	if (!category) return ''
	return ` AND category:${category}`
}

const getTagFilter = (tag: string) => {
	if (!tag) return ''
	return ` AND tags:${tag}`
}

type Record = {
	readonly objectID?: string
	readonly lastmodified?: string
	readonly path?: string
	readonly _highlightResult?: {} | undefined
	readonly _snippetResult?: {} | undefined
	readonly _rankingInfo?: any
	readonly _distinctSeqID?: number | undefined
}

const structurePostObject = (record: Record) => {
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

const filterLocation = (posts: PostCollectionRequired[], userId: Id) => {
	return posts.map((post) => {
		const currentPost = { ...post }
		if (post.locationView === 'private' && post.owner.userId !== userId) {
			currentPost.location = {} as PostCollectionRequired['location']
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

export {
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
}
