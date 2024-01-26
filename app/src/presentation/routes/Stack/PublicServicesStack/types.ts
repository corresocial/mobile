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
	QueryBeeByNISResult: QueryBeeResult
	QueryPbfByNISResult: QueryPbfResult
	QueryCadunicoByNISResult: QueryCadunicoResult
	QueryNISResult: { NIS: string, success: boolean }
} & HomeTabParamList
