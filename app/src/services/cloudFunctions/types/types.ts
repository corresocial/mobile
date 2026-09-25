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
