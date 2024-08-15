import React from 'react'
import { SvgProps } from 'react-native-svg'

export type AddressSearchResult = { // REFACTOR Isso deveria existir, e aqui?
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

export type CurrentCategory = {
	backgroundColor?: string
	categoryName: string
	categoryTitle: string
	categorySvgIcon: React.FC<SvgProps> | null
	categoryTags: string[]
}

export type SelectedAddressRender = {
	addressHighlighted: string
	addressThin: string
}

// Refactored v

export type PlaceLimits = {
	northeast: { lat: number, lng: number },
	southwest: { lat: number, lng: number }
}
