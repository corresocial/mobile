import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult, SmasService } from '@domain/entities/smas/types'

import { HomeTabParamList } from '../../Tabs/HomeTab/types'

export type PublicServiceStackParamList = {
	SelectPublicService: undefined
	InsertNIS: { smasService: SmasService }
	InsertNameNIS: undefined
	SelectNISQueryData: undefined
	InsertMotherNameNIS: undefined
	InsertDateOfBirthNIS: undefined
	InsertAnonymizedCpfNIS: undefined
	QueryNISResult: { NIS: string, success: boolean }
	QueryBeeByNISResult: QueryBeeResult
	QueryPbfByNISResult: QueryPbfResult
	QueryCadunicoByNISResult: QueryCadunicoResult
} & HomeTabParamList
