import { clearNisValue, getNisValue, saveNisValue } from './localRepository/methods'
import { getNotificationTokenByNis } from './remoteRepository/getNotificationTokenByNis'
import { updateSmasTokenNotification } from './remoteRepository/updateSmasTokenNotification'
import { SmasRepositoryInterface } from './SmasRepositoryInterface'

function useSmasRepository(): SmasRepositoryInterface {
	return {
		localStorage: {
			getNisValue: getNisValue,
			saveNisValue: saveNisValue,
			clearNisValue: clearNisValue
		},
		remoteStorage: {
			getNotificationTokenByNis: getNotificationTokenByNis,
			updateSmasTokenNotification: updateSmasTokenNotification
		}
	}
}

export { useSmasRepository }
