import { getNisFromLocalRepositoryUC } from '@domain/smas/methods/getNisFromLocalRepositoryUC'
import { setNisOnLocalRepositoryUC } from '@domain/smas/methods/setNisOnLocalRepositoryUC'
import { setSmasPushNotificationStateUC } from '@domain/smas/methods/setSmasPushNotificationStateUC'
import { smasNisHasLinkedWithUserUC } from '@domain/smas/methods/smasNisHasLinkedWithUser'
import { treatSmasApiResponseUC } from '@domain/smas/methods/treatSmasApiResponseUC'
import { validateNameUC } from '@domain/smas/methods/validateNameUC'
import { validateNISUC } from '@domain/smas/methods/validateNISUC'

import { SmasAdapterInterface } from './SmasAdapterInterface'

function SmasAdapter(): SmasAdapterInterface {
	return {
		validateNIS: validateNISUC,
		validateName: validateNameUC,
		treatSmasApiResponse: treatSmasApiResponseUC,
		setNisOnLocalRepository: setNisOnLocalRepositoryUC,
		getNisFromLocalRepository: getNisFromLocalRepositoryUC,
		smasNisHasLinkedWithUser: smasNisHasLinkedWithUserUC,
		setSmasPushNotificationState: setSmasPushNotificationStateUC
	}
}

export { SmasAdapter }
