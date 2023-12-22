import * as Location from 'expo-location'

export interface LocationServiceInterface {
	getCurrentLocation(): Promise<Location.LocationObject>
	convertGeocodeToAddress(latitude: number, longitude: number): Promise<Location.LocationGeocodedAddress[]>
}
