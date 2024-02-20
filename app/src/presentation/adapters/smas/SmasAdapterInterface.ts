import { Id } from '@domain/entities/globalTypes'
import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult, SmasService } from '@domain/entities/smas/types'

import { SmasRepositoryAdapterInterface } from '@data/smas/SmasRepositoryAdapterInterface'

interface SmasAdapterInterface {
	validateNIS: (NISValue: string) => boolean
	validateName: (name: string) => boolean
	treatSmasApiResponse: (apiResponse: any, smasService: SmasService) => QueryBeeResult | QueryPbfResult | QueryCadunicoResult | { nisNotFound: boolean }
	setNisOnLocalRepository: (nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) => Promise<boolean>
	getNisFromLocalRepository: (SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) => Promise<string>
	smasNisHasLinkedWithUser: (nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) => Promise<boolean>
	setSmasPushNotificationState: (state: boolean, nis: string, userId: Id, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) => Promise<void>
}

export { SmasAdapterInterface }
