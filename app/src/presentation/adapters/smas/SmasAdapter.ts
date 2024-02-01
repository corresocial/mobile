import { getNisFromLocalRepositoryUC } from '@domain/useCases/smas/getNisFromLocalRepositoryUC'
import { setNisOnLocalRepositoryUC } from '@domain/useCases/smas/setNisOnLocalRepositoryUC'
import { treatSmasApiResponseUC } from '@domain/useCases/smas/treatSmasApiResponseUC'
import { validateNameUC } from '@domain/useCases/smas/validateNameUC'
import { validateNISUC } from '@domain/useCases/smas/validateNISUC'

import { SmasAdapterInterface } from './SmasAdapterInterface'

function SmasAdapter(): SmasAdapterInterface {
	return {
		validateNIS: validateNISUC,
		validateName: validateNameUC,
		treatSmasApiResponse: treatSmasApiResponseUC,
		setNisOnLocalRepository: setNisOnLocalRepositoryUC,
		getNisFromLocalRepository: getNisFromLocalRepositoryUC
	}
}

export { SmasAdapter }
