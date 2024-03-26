import { SmasService } from '@domain/smas/entity/types'

import { checkSmasApiResponseStatus } from '../core/checkSmasApiResponseStatus'
import { structureBeeObject } from '../core/structureBeeObject'
import { structureCadunicoObject } from '../core/structureCadunicoObject'
import { structurePbfObject } from '../core/structurePbfObject'

const treatSmasApiResponseUC = (apiResponse: any, smasService: SmasService) => {
	const [responseData, hasError] = checkSmasApiResponseStatus(apiResponse)

	if (hasError) return responseData

	switch (smasService) {
		case 'BEE': return structureBeeObject(responseData)
		case 'PBF': return structurePbfObject(responseData)
		case 'CADUNICO': return structureCadunicoObject(responseData)
		default: return { nisNotFound: true }
	}
}

export { treatSmasApiResponseUC }
