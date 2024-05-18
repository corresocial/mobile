import { PostType, LatLong } from '@domain/post/entity/types'

import { MacroCategoriesType } from '@utils/postMacroCategories/types'

export type FeedSearchParams = {
	searchLeaderPosts?: boolean
	searchText: string
	range: string
	city: string
	country: string
	macroCategory: MacroCategoriesType
	category: string
	tag: string
	postType: PostType
	coordinates: LatLong // Não existem
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
