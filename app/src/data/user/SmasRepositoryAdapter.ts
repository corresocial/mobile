import { clearStoragedNis, getNisFromStorage, setNisOnStorage } from '@data/localStorage/smas'

import { SmasRepositoryAdapterInterface } from './SmasRepositoryAdapterInterface'

function SmasRepositoryAdapter(): SmasRepositoryAdapterInterface {
	return {
		local: {
			getNisFromStorage,
			setNisOnStorage,
			clearStoragedNis
		},
		remote: {

		}
	}
}

export { SmasRepositoryAdapter }
