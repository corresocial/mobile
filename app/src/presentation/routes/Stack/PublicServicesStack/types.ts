import { SmasService } from '@domain/entities/smas/types'

import { HomeTabParamList } from '../../Tabs/HomeTab/types'

export type PublicServiceStackParamList = {
	SelectPublicService: undefined
	InsertNIS: { smasService: SmasService }
	InsertNameNIS: undefined
	SelectNISQueryData: undefined
	InsertMotherNameNIS: undefined
	InsertDateOfBirthNIS: undefined
	InsertAnonymizedCpfNIS: undefined
	QueryByNISResult: {
		smasService: SmasService
		NIS: string
		status: string // TODO Type
		grantDate: string
		benefitGranted: string
		inAnalysis: boolean
		withoutRequest: boolean
		nisNotFound: boolean
		expectedDate: string
		familyBagName: string
		familyBagValue: string
	}
	QueryPbfByNISResult: {
		NIS: string
		nisNotFound: boolean
		status: string // TODO Type
		familyBagName: string
		familyBagValue: string
	}
	QueryCadunicoByNISResult: {
		NIS: string
		nisNotFound: boolean
		name: string
		expirationDate: string
		status: string // TODO Type
		lastUpdate: string
	}
	QueryNISResult: { NIS: string, success: boolean }
} & HomeTabParamList
