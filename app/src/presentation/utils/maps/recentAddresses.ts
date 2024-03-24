import { AddressSearchResult } from '@services/googleMaps/types/types'

const getMostRecentAddress = (recentAddresses: AddressSearchResult[]) => {
	if (recentAddresses && recentAddresses.length) {
		return {
			lat: recentAddresses[0].lat,
			lon: recentAddresses[0].lon
		}
	}
	return null
}

export { getMostRecentAddress }
