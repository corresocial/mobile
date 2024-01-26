import { PBF } from '@domain/entities/smas/types'

function structurePbfObject(responseData: PBF) {
	return {
		NIS: responseData.nis,
		status: responseData.status,
		familyBagName: responseData.nome,
		familyBagValue: responseData.valor
	}
}

export { structurePbfObject }
