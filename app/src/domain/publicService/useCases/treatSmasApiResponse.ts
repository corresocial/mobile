import { SmasService } from '@domain/entities/smas/types'

import { checkSmasApiResponseStatus } from '../rules/checkSmasApiResponseStatus'
import { structureBeeObject } from '../rules/structureBeeObject'
import { structureCadunicoObject } from '../rules/structureCadunicoObject'
import { structurePbfObject } from '../rules/structurePbfObject'

const treatSmasApiResponseUC = (apiResponse: any, smasService: SmasService) => {
	const [responseData, hasError] = checkSmasApiResponseStatus(apiResponse)

	if (hasError) return responseData

	switch (smasService) {
		case 'BEE': return structureBeeObject(responseData)
		case 'PBF': return structurePbfObject(responseData)
		case 'CADUNICO': return structureCadunicoObject(responseData)
	}
}

export { treatSmasApiResponseUC }
