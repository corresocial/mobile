import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterEntity } from '../model/entities/types'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'

type Input = void
type Output = Promise<void>

export class SendOfflineRegisters implements UseCase<Input, Output> {
	private localRepository: CitizenRegisterLocalRepositoryInterface
	private remoteRepository: CitizenRegisterRemoteRepositoryInterface

	constructor(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>
	) {
		this.localRepository = new CitizenRegisterLocalRepository()
		this.remoteRepository = new CitizenRegisterRemoteRepository()
	}

	async exec(): Output { // TEST
		const offlineRegisters = await this.localRepository.getOfflineCitizenRegisters()

		Promise.all(
			offlineRegisters.map(async (register: CitizenRegisterEntity) => {
				try {
					await this.remoteRepository.createCitizenRegister(register)
					await this.localRepository.removeCitizenRegister(register.citizenRegisterId)
				} catch (error) {
					console.log(error)
					console.log(`Falha ao enviar o registro de ${register.name}`)
				}
			})
		)
	}
}
