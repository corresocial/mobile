import { getReverseGeocodeByMapsApi } from './getReverseGeocodeByMapsApi'
import { GoogleMapsServiceInterface } from './GoogleMapsServiceInterface'
import { getPlaceLimits } from './methods/getPlaceLimits'
import { searchAddressByText } from './methods/searchAddressByText'

function useGoogleMapsService(): GoogleMapsServiceInterface {
	return {
		getPlaceLimits: getPlaceLimits,
		searchAddressByText: searchAddressByText,
		getReverseGeocodeByMapsApi: getReverseGeocodeByMapsApi
	}
} // REFACTOR OCURRENCES of "getReverseGeocodeByMapsApi"

export { useGoogleMapsService }
