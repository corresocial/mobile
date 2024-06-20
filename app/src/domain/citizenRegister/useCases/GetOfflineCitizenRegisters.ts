import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterEntity } from '../model/entities/types'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'

type Input = void
type Output = Promise<CitizenRegisterEntity[]>

export class GetOfflineCitizenRegisters implements UseCase<Input, Output> {
	private localRepository: CitizenRegisterLocalRepositoryInterface

	constructor(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>
	) {
		this.localRepository = new CitizenRegisterLocalRepository()
	}

	async exec(): Output { // TEST
		return this.localRepository.getOfflineCitizenRegisters()
	}
}
