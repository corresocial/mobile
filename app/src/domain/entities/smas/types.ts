export type SmasService = 'BEE' | 'PBF' | 'CADUNICO'

export type Binary = '0' | '1'
type BeeType = 'cartão alimentação' | 'depósito em conta'
type PbfStatus = 'Liberado' | 'Suspenso' | 'Bloqueado'
type CadunicoStatus = 'Atualizado' | 'Desatualizado'

export type BEE = {
	nis: string
	nome: string
	solicitacao_beneficio: Binary
	deposito_conta: Binary
	cartao_alimentacao_concedido: Binary
	beneficio_nao_concedido: Binary
}

export type PBF = {
	nis: string
	nome: string
	status: PbfStatus
	valor: string
}

export type CADUNICO = {
	nis: string
	nome: string
	data_ultima_atualizacao: string
	condicao: CadunicoStatus
	vencimento_previsto: string
}

export interface SmasRecoveryNISData {
	NIS: string
	name: string
	motherName: string
	dateOfBirth: string
	anonymizedCpf: string
}

export type QueryBeeResult = {
	nisNotFound?: boolean
	serverError?: boolean
	benefitRequested: boolean
	inAnalysis: boolean
	benefitGranted: BeeType
	grantDate: string
	expectedDate: string
}

export type QueryPbfResult = {
	nisNotFound?: boolean
	serverError?: boolean
	NIS: string
	status: PbfStatus
	familyBagName: string
	familyBagValue: string
}

export type QueryCadunicoResult = {
	nisNotFound?: boolean
	serverError?: boolean
	NIS: string // Obsoleto
	name: string // Obsoleto
	status: CadunicoStatus
	lastUpdate: string
}
