import { validateNameUC } from '@domain/publicService/useCases/validateNameUC'
import { validateNISUC } from '@domain/publicService/useCases/validateNISUC'

import { PublicServiceAdapterInterface } from './PublicServiceAdapterInterface'

function PublicServicesAdapter(): PublicServiceAdapterInterface {
	return {
		validateNIS: validateNISUC,
		validateName: validateNameUC,
	}
}

export { PublicServicesAdapter }
