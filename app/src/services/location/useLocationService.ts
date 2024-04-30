import { LocationServiceInterface } from './LocationServiceInterface'
import { convertGeocodeToAddress } from './methods/geocodeConverter'
import { getCoordinatesByIpAddress } from './methods/getCoordinateByIpAddress'
import { getCurrentLocation } from './methods/getCurrentLocation'

function useLocationService(): LocationServiceInterface {
	return {
		getCurrentLocation: getCurrentLocation,
		convertGeocodeToAddress: convertGeocodeToAddress,
		getCoordinatesByIpAddress: getCoordinatesByIpAddress
	}
}

export { useLocationService }
