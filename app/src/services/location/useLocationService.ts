import { LocationServiceInterface } from './LocationServiceInterface'
import { convertGeocodeToAddress } from './methods/geocodeConverter'
import { getCurrentLocation } from './methods/getCurrentLocation'

function useLocationService(): LocationServiceInterface {
	return {
		getCurrentLocation: getCurrentLocation,
		convertGeocodeToAddress: convertGeocodeToAddress
	}
}

export { useLocationService }
