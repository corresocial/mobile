import { clearStoragedNis, getNisFromStorage, setNisOnStorage } from '@data/localStorage/smas'
import { getNotificationTokenByNis } from '@data/remoteStorage/smas/getNotificationTokenByNis'
import { updateSmasTokenNotification } from '@data/remoteStorage/smas/updateSmasTokenNotification'

import { SmasRepositoryAdapterInterface } from './SmasRepositoryAdapterInterface'

function SmasRepositoryAdapter(): SmasRepositoryAdapterInterface {
	return {
		local: {
			getNisFromStorage,
			setNisOnStorage,
			clearStoragedNis
		},
		remote: {
			getNotificationTokenByNis,
			updateSmasTokenNotification
		}
	}
}

export { SmasRepositoryAdapter }
