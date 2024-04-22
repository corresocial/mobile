import { CADUNICO } from '@domain/smas/entity/types'

function structureCadunicoObject(responseData: CADUNICO) {
	return {
		NIS: responseData.nis,
		name: responseData.nome,
		expirationDate: responseData.vencimento_previsto,
		status: responseData.condicao,
		lastUpdate: responseData.data_ultima_atualizacao
	}
}

export { structureCadunicoObject }
