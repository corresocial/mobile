import { AddressSearchResult } from '@services/maps/types'

interface LocationRepositoryInterface {
	localStorage: {
		getRecentAddresses: () => Promise<AddressSearchResult[]>
		saveAddressData: (data: AddressSearchResult) => Promise<boolean>
	},

	remoteStorage: {

	}
}

export { LocationRepositoryInterface }
