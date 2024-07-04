import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'

type Input = null
type Output = Promise<void>

export class RemoveCitizenRegistrationInProgress implements UseCase<Input, Output> {
	private localRepository: CitizenRegisterLocalRepositoryInterface

	constructor(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
	) {
		this.localRepository = new CitizenRegisterLocalRepository()
	}

	async exec(): Output { // TEST
		return this.localRepository.removeCitizenRegistrationInProgress()
	}
}
