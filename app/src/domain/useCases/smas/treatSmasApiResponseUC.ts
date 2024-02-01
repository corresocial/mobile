import { SmasService } from '@domain/entities/smas/types'

import { checkSmasApiResponseStatus } from '../../rules/smas/checkSmasApiResponseStatus'
import { structureBeeObject } from '../../rules/smas/structureBeeObject'
import { structureCadunicoObject } from '../../rules/smas/structureCadunicoObject'
import { structurePbfObject } from '../../rules/smas/structurePbfObject'

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
