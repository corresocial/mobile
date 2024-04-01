import { getRecentAddresses, saveAddressData } from './localRepository/address'
import { LocationRepositoryInterface } from './LocationRepositoryInterface'

function useLocationRepository(): LocationRepositoryInterface {
	return {
		localStorage: {
			getRecentAddresses: getRecentAddresses,
			saveAddressData: saveAddressData
		},
		remoteStorage: {

		}
	}
}

export { useLocationRepository }
