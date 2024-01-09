import { validateNISUC } from '@domain/publicService/useCases/validateNISUC'

import { PublicServiceAdapterInterface } from './PublicServiceAdapterInterface'

function PublicServicesAdapter(): PublicServiceAdapterInterface {
	return {
		validateNIS: validateNISUC,
	}
}

export { PublicServicesAdapter }
