import { PostType } from '../firebase/types'

export type AddressSearchResult = {
	formattedAddress: string
	lat: number
	lon: number
	recent?: boolean
}

export type LatLong = {
	lat: number,
	lon: number
}

export type SearchParams = {
	searchText: string
	range: string
	city: string
	country: string
	category: string
	tag: string
	postType: PostType | string
	coordinates: LatLong
	geohashes: string[]
}

export type CurrentCategory = {
	backgroundColor: string
	inactiveColor: string
	categoryName: string
	categoryTitle: string
	categoryIcon: string
	categoryTags: string[]
}

export type SelectedAddressRender = {
	addressHighlighted: string
	addressThin: string
}
