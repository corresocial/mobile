import { SmasRecoveryNISData, SmasService } from '@domain/entities/smas/types'

interface CloudFunctionServiceInterface {
	getNisByUserData: (searchParams: SmasRecoveryNISData, smasService: SmasService) => Promise<{ NIS: string, status: number }>
}

export { CloudFunctionServiceInterface }
