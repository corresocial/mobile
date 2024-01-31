import { treatSmasApiResponseUC } from '@domain/publicService/useCases/treatSmasApiResponse'
import { validateNameUC } from '@domain/publicService/useCases/validateNameUC'
import { validateNISUC } from '@domain/publicService/useCases/validateNISUC'

import { SmasAdapterInterface } from './SmasAdapterInterface'

function SmasAdapter(): SmasAdapterInterface {
	return {
		validateNIS: validateNISUC,
		validateName: validateNameUC,
		treatSmasApiResponse: treatSmasApiResponseUC
	}
}

export { SmasAdapter }
