import { Id } from '@domain/globalTypes'
import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult, SmasService } from '@domain/smas/entity/types'

import { SmasRepositoryInterface } from '@data/smas/SmasRepositoryInterface'

interface SmasDomainInterface {
	validateNIS: (NISValue: string) => boolean
	validateName: (name: string) => boolean
	treatSmasApiResponse: (apiResponse: any, smasService: SmasService) => QueryBeeResult | QueryPbfResult | QueryCadunicoResult | { nisNotFound: boolean }
	setNisOnLocalRepository: (nis: string, useSmasRepository: () => SmasRepositoryInterface) => Promise<boolean>
	getNisFromLocalRepository: (useSmasRepository: () => SmasRepositoryInterface) => Promise<string>
	smasNisHasLinkedWithUser: (nis: string, useSmasRepository: () => SmasRepositoryInterface) => Promise<boolean>
	setSmasPushNotificationState: (state: boolean, nis: string, userId: Id, useSmasRepository: () => SmasRepositoryInterface) => Promise<void>
}

export { SmasDomainInterface }
