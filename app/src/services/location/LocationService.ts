import { LocationServiceInterface } from './LocationServiceInterface'
import { convertGeocodeToAddress } from './methods/geocodeConverter'
import { getCurrentLocation } from './methods/getCurrentLocation'

function LocationService(): LocationServiceInterface {
	return {
		getCurrentLocation,
		convertGeocodeToAddress
	}
}

export { LocationService }
