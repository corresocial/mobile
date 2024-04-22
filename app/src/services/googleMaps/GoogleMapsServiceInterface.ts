import { AddressSearchResult, GeocodeAddress, PlaceLimits } from './types/maps'

interface GoogleMapsServiceInterface {
	getPlaceLimits: (query: string) => Promise<PlaceLimits | boolean>
	searchAddressByText: (query: string, allResults?: boolean) => Promise<AddressSearchResult[]>
	getReverseGeocodeByMapsApi: (latitude: number, longitude: number) => Promise<GeocodeAddress>
}

export { GoogleMapsServiceInterface }
