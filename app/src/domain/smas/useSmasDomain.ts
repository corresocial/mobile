import { getNisFromLocalRepositoryUC } from './methods/getNisFromLocalRepositoryUC'
import { setNisOnLocalRepositoryUC } from './methods/setNisOnLocalRepositoryUC'
import { setSmasPushNotificationStateUC } from './methods/setSmasPushNotificationStateUC'
import { smasNisHasLinkedWithUserUC } from './methods/smasNisHasLinkedWithUser'
import { treatSmasApiResponseUC } from './methods/treatSmasApiResponseUC'
import { validateNameUC } from './methods/validateNameUC'
import { validateNISUC } from './methods/validateNISUC'
import { SmasDomainInterface } from './SmasDomainInterface'

function useSmasDomain(): SmasDomainInterface {
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

export { useSmasDomain }
