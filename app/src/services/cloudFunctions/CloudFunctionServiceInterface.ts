import { SmasRecoveryNISData, SmasService } from '@domain/entities/smas/types'

import { RequestData, SearchParams } from './types'

interface CloudFunctionServiceInterface {
	getNisByUserData: (searchParams: SmasRecoveryNISData, smasService: SmasService) => Promise<{ NIS: string, status: number }>
	notifyUsersOnLocation: (searchParams: SearchParams, requestData: RequestData) => Promise<void>
}

export { CloudFunctionServiceInterface }
