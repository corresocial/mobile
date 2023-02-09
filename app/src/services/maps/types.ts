import React from 'react'
import { SvgProps } from 'react-native-svg'
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
	postType: PostType
	category: string
	tag: string
	coordinates: LatLong
	geohashes: string[]
}

export type CurrentCategory = {
	backgroundColor: string
	categoryName: string
	categoryTitle: string
	categoryIcon: React.FC<SvgProps>
	categoryTags: string[]
}

export type SelectedAddressRender = {
	addressHighlighted: string
	addressThin: string
}
