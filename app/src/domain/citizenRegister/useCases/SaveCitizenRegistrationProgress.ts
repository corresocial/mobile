import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterEntityOptional } from '../model/entities/types'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'

type Input = CitizenRegisterEntityOptional
type Output = Promise<string | void>

export class SaveCitizenRegistrationProgress implements UseCase<Input, Output> {
	private localRepository: CitizenRegisterLocalRepositoryInterface

	constructor(CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>) {
		this.localRepository = new CitizenRegisterLocalRepository()
	}

	async exec(citizenRegisterData: Input): Output { // TEST
		return this.localRepository.updateCitizenRegistrationInProgress(citizenRegisterData)
	}
}
