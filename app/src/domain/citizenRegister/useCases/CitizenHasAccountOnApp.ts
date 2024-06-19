import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

type Input = string
type Output = Promise<boolean>

export class CitizenHasAccountOnApp implements UseCase<Input, Output> {
	private cloudFunctionService: CloudFunctionServiceInterface

	constructor(
		useCloudFunctionService: () => CloudFunctionServiceInterface
	) {
		this.cloudFunctionService = useCloudFunctionService()
	}

	async exec(cellNumber: string): Output { // CURRENT Teste
		return this.cloudFunctionService.checkUserPhoneAlreadyRegistredCloud(cellNumber)
	}
}
