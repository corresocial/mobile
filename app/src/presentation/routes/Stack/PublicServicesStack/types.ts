import { SMASService } from '@domain/entities/smas/types'

import { HomeTabParamList } from '../../Tabs/HomeTab/types'

export type PublicServiceStackParamList = {
	SelectPublicService: undefined
	QueryResult: {
		smasService: SMASService
		NIS: string
		status: string // TODO Type
		grantDate: string
		expectedDate: string
		familyBagName: string
		familyBagValue: string
	}
	InsertNIS: { smasService: SMASService }
	InsertNameNIS: undefined
} & HomeTabParamList
