import { AddressSearchResult, GeocodeAddress, PlaceLimits } from './types/types'

interface GoogleMapsServiceInterface {
	getPlaceLimits: (query: string) => Promise<PlaceLimits | boolean>
	searchAddressByText: (query: string, allResults?: boolean) => Promise<AddressSearchResult[]>
	getReverseGeocodeByMapsApi: (latitude: number, longitude: number) => Promise<GeocodeAddress | null>
}

export { GoogleMapsServiceInterface }
