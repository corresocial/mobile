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
	range: string
	city: string
	country: string
	postType: string
	coordinates: LatLong
	geohashes: string[]
}

export type SelectedAddressRender = {
	addressHighlighted: string;
	addressThin: string;
}
