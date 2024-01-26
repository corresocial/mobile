import { QueryBeeResult, QueryCadunicoResult, QueryPbfResult, SmasService } from '@domain/entities/smas/types'

interface PublicServiceAdapterInterface {
	validateNIS: (NISValue: string) => boolean
	validateName: (name: string) => boolean
	treatSmasApiResponse: (apiResponse: any, smasService: SmasService) => QueryBeeResult | QueryPbfResult | QueryCadunicoResult | { nisNotFound: boolean }
}

export { PublicServiceAdapterInterface }
