import { HttpsError } from 'firebase-functions/v2/https'

import { MacroCategoriesType, PostType } from '../domain/entities/post/common'
import { RequestBody } from '../domain/entities/request'

// Values below are interpolated into Algolia filter strings: validate them to block filter injection

// Record<Type, true> fails to compile if a new value is added to the domain type and not here
const POST_TYPES: Record<PostType, true> = { income: true, socialImpact: true, culture: true }
const MACRO_CATEGORIES: Record<MacroCategoriesType, true> = {
	sale: true, service: true, vacancy: true,
	art: true, event: true, education: true,
	informative: true, iniciative: true, donation: true
}

const MAX_SEARCH_TEXT_LENGTH = 512 // Algolia query limit
const MAX_GEOHASHES = 50 // app sends 9 (center + 8 neighbors)
const GEOHASH_REGEX = /^[0-9bcdefghjkmnpqrstuvwxyz]{1,12}$/
const PLACE_NAME_REGEX = /^[\p{L}\p{M}\p{N} .'’-]{1,100}$/u // city/country, e.g. "Santa Bárbara d'Oeste"
const CATEGORY_REGEX = /^[A-Za-z0-9_-]{1,64}$/ // app category values are camelCase ids
const TAG_REGEX = /^[\p{L}\p{M}\p{N} _+.-]{1,64}$/u // e.g. "fast food", "LGBTQIAP+", "quebra-cabeças"

const isEmpty = (value: unknown) => value === undefined || value === null || value === ''

const invalid = (field: string) => new HttpsError('invalid-argument', `Invalid ${field}`)

// Empty values keep the previous behavior (the filter builders already handle them)
const assertOptionalString = (value: unknown, field: string, isValid: (value: string) => boolean) => {
	if (isEmpty(value)) return
	if (typeof value !== 'string' || !isValid(value)) throw invalid(field)
}

const hasOwn = (record: object, key: string) => Object.prototype.hasOwnProperty.call(record, key)

const validateSearchRequest = (data: unknown): RequestBody => {
	if (!data || typeof data !== 'object') throw invalid('request')

	const { searchText, searchParams } = data as Partial<RequestBody>

	assertOptionalString(searchText, 'searchText', (text) => text.length <= MAX_SEARCH_TEXT_LENGTH)

	if (!searchParams || typeof searchParams !== 'object') throw invalid('searchParams')

	const { geohashes } = searchParams
	if (!isEmpty(geohashes)) {
		if (!Array.isArray(geohashes) || geohashes.length > MAX_GEOHASHES) throw invalid('searchParams.geohashes')
		geohashes.forEach((geohash) => {
			if (typeof geohash !== 'string' || !GEOHASH_REGEX.test(geohash)) throw invalid('searchParams.geohashes')
		})
	}

	assertOptionalString(searchParams.postType, 'searchParams.postType', (value) => hasOwn(POST_TYPES, value))
	assertOptionalString(searchParams.macroCategory, 'searchParams.macroCategory', (value) => hasOwn(MACRO_CATEGORIES, value))
	assertOptionalString(searchParams.city, 'searchParams.city', (value) => PLACE_NAME_REGEX.test(value))
	assertOptionalString(searchParams.country, 'searchParams.country', (value) => PLACE_NAME_REGEX.test(value))
	assertOptionalString(searchParams.category, 'searchParams.category', (value) => CATEGORY_REGEX.test(value))
	assertOptionalString(searchParams.tag, 'searchParams.tag', (value) => TAG_REGEX.test(value))

	return data as RequestBody
}

export { validateSearchRequest }
