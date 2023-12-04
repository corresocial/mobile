import { LocationServiceInterface } from './LocationServiceInterface'

import { getCurrentLocation } from './getCurrentLocation'
import { convertGeocodeToAddress } from './geocodeConverter'

function LocationService(): LocationServiceInterface {
	return {
		getCurrentLocation,
		convertGeocodeToAddress
	}
}

export { LocationService }
