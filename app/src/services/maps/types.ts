import React from 'react'
import { SvgProps } from 'react-native-svg'

import { PostType } from '../firebase/types'
import { MacroCategoriesType } from '../../presentation/utils/postMacroCategories/types'

export type AddressSearchResult = {
	formattedAddress: string
	lat: number
	lon: number
	recent?: boolean
}

export type GeocodeAddress = {
	city?: string
	country?: string
	street?: string
	number?: string
	state?: string
	district?: string
	postalCode?: string
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
	macroCategory: MacroCategoriesType
	category: string
	tag: string
	postType: PostType
	coordinates: LatLong
	geohashes: string[]
}

export type CurrentCategory = {
	backgroundColor?: string
	inactiveColor?: string
	categoryName: string
	categoryTitle: string
	categorySvgIcon: React.FC<SvgProps> | null
	categoryTags: string[]
}

export type SelectedAddressRender = {
	addressHighlighted: string
	addressThin: string
}
