import { GoogleMapsServiceInterface } from './GoogleMapsServiceInterface'
import { getPlaceLimits } from './methods/getPlaceLimits'
import { getReverseGeocodeByMapsApi } from './methods/getReverseGeocodeByMapsApi'
import { searchAddressByText } from './methods/searchAddressByText'

function useGoogleMapsService(): GoogleMapsServiceInterface {
	return {
		getPlaceLimits: getPlaceLimits,
		searchAddressByText: searchAddressByText,
		getReverseGeocodeByMapsApi: getReverseGeocodeByMapsApi
	}
}

export { useGoogleMapsService }
