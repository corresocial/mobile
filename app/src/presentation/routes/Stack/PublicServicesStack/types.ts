import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult, SmasService } from '@domain/entities/smas/types'

import { UserStackParamList } from '../UserStack/types'

export type PublicServiceStackParamList = {
	SelectPublicService: undefined
	InsertNIS: { smasService: SmasService }
	InsertNameNIS: undefined
	SelectNISQueryData: undefined
	InsertMotherNameNIS: undefined
	InsertDateOfBirthNIS: undefined
	InsertAnonymizedCpfNIS: undefined
	QueryNISResult: { NIS: string, status: number }
	QueryBeeByNISResult: QueryBeeResult
	QueryPbfByNISResult: QueryPbfResult
	QueryCadunicoByNISResult: QueryCadunicoResult
} & UserStackParamList
