import { convertGeocodeToAddress } from './geocodeConverter'
import { getCurrentLocation } from './getCurrentLocation'
import { LocationServiceInterface } from './LocationServiceInterface'

function LocationService(): LocationServiceInterface {
	return {
		getCurrentLocation,
		convertGeocodeToAddress
	}
}

export { LocationService }
