import { AddressSearchResult } from '@services/googleMaps/types/types'

interface LocationRepositoryInterface {
	localStorage: {
		getRecentAddresses: () => Promise<AddressSearchResult[]>
		saveAddressData: (data: AddressSearchResult) => Promise<boolean>
	},

	remoteStorage: {

	}
}

export { LocationRepositoryInterface }
