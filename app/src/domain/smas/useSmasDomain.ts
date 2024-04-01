import { getNisFromLocalRepositoryDM } from './methods/getNisFromLocalRepositoryDM'
import { setNisOnLocalRepositoryDM } from './methods/setNisOnLocalRepositoryDM'
import { setSmasPushNotificationStateDM } from './methods/setSmasPushNotificationStateDM'
import { smasNisHasLinkedWithUserDM } from './methods/smasNisHasLinkedWithUserDM'
import { treatSmasApiResponseDM } from './methods/treatSmasApiResponseDM'
import { validateNameDM } from './methods/validateNameDM'
import { validateNISDM } from './methods/validateNISDM'
import { SmasDomainInterface } from './SmasDomainInterface'

function useSmasDomain(): SmasDomainInterface {
	return {
		validateNIS: validateNISDM,
		validateName: validateNameDM,
		treatSmasApiResponse: treatSmasApiResponseDM,
		setNisOnLocalRepository: setNisOnLocalRepositoryDM,
		getNisFromLocalRepository: getNisFromLocalRepositoryDM,
		smasNisHasLinkedWithUser: smasNisHasLinkedWithUserDM,
		setSmasPushNotificationState: setSmasPushNotificationStateDM
	}
}

export { useSmasDomain }
