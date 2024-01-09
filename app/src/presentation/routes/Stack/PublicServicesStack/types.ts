import { SMASService } from '@domain/entities/smas/types'

import { HomeTabParamList } from '../../Tabs/HomeTab/types'

export type PublicServiceStackParamList = {
	SelectPublicService: undefined
	InsertNIS: { smasService: SMASService }
} & HomeTabParamList
