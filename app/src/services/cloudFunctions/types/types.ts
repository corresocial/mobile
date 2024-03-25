import { PostType } from '@domain/entities/posts/types'

import { LatLong } from '@services/firebase/types'
import { MacroCategoriesType } from '@utils/postMacroCategories/types'

export type FeedSearchParams = {
	searchText: string
	range: string
	city: string
	country: string
	macroCategory: MacroCategoriesType
	category: string
	tag: string
	postType: PostType
	coordinates: LatLong
	geohashes: string[]
}

export type NotifyUsersByLocationParams = {
	state: string
	city: string
	district: string
	postRange: 'near' | 'city'
}

export type RequestData = {
	userId: string
	userName: string
	postDescription: string
}

export type RequestBody = {
	searchParams: NotifyUsersByLocationParams
	requestData: RequestData
}
