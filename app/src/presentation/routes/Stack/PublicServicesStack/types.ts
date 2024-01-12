import { SmasService } from '@domain/entities/smas/types'

import { HomeTabParamList } from '../../Tabs/HomeTab/types'

export type PublicServiceStackParamList = {
	SelectPublicService: undefined
	QueryResult: {
		smasService: SmasService
		NIS: string
		status: string // TODO Type
		grantDate: string
		expectedDate: string
		familyBagName: string
		familyBagValue: string
	}
	InsertNIS: { smasService: SmasService }
	InsertNameNIS: undefined
	SelectNISQueryData: undefined
	InsertMotherNameNIS: undefined
	InsertDateOfBirthNIS: undefined
} & HomeTabParamList
