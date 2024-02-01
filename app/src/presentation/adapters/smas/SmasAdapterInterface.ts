import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult, SmasService } from '@domain/entities/smas/types'

import { SmasRepositoryAdapterInterface } from '@data/user/SmasRepositoryAdapterInterface'

interface SmasAdapterInterface {
	validateNIS: (NISValue: string) => boolean
	validateName: (name: string) => boolean
	treatSmasApiResponse: (apiResponse: any, smasService: SmasService) => QueryBeeResult | QueryPbfResult | QueryCadunicoResult | { nisNotFound: boolean }
	setNisOnLocalRepository: (nis: string, SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) => Promise<boolean>
	getNisFromLocalRepository: (SmasRepositoryAdapter: () => SmasRepositoryAdapterInterface) => Promise<string>
}

export { SmasAdapterInterface }
