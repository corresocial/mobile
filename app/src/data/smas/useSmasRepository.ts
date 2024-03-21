import { clearNisValue, getNisValue, saveNisValue } from '@data/smas/localRepository/methods'
import { getNotificationTokenByNis } from '@data/smas/remoteRepository/getNotificationTokenByNis'
import { updateSmasTokenNotification } from '@data/smas/remoteRepository/updateSmasTokenNotification'

import { SmasRepositoryInterface } from './SmasRepositoryInterface'

function useSmasRepository(): SmasRepositoryInterface {
	return {
		local: {
			getNisValue: getNisValue,
			saveNisValue: saveNisValue,
			clearNisValue: clearNisValue
		},
		remote: {
			getNotificationTokenByNis,
			updateSmasTokenNotification
		}
	}
}

export { useSmasRepository }
