import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'

import { CitizenRegisterRemoteRepository } from '@data/citizenRegister/CitizenRegisterRemoteRepository'

import { CitizenRegisterEntity } from '../model/entities/types'

import { GoogleMapsService } from '@services/googleMaps/GoogleMapsService'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'
import { CreateCitizenRegister } from './CreateCitizenRegister'

type Input = void
type Output = Promise<void>

export class SendOfflineRegisters implements UseCase<Input, Output> {
	private localRepository: CitizenRegisterLocalRepositoryInterface
	private remoteRepository: CitizenRegisterRemoteRepositoryInterface

	constructor(
		RegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
		RegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>
	) {
		this.localRepository = new RegisterLocalRepository()
		this.remoteRepository = new RegisterRemoteRepository()
	}

	async exec(): Output { // TEST
		const offlineRegisters = await this.localRepository.getOfflineCitizenRegisters()

		Promise.all(
			offlineRegisters.map(async (register: CitizenRegisterEntity) => {
				try {
					// REFACTOR Não deve ser importado diretamente aqui
					await new CreateCitizenRegister(CitizenRegisterRemoteRepository, GoogleMapsService, {} as any).exec(register)
					await this.localRepository.removeCitizenRegister(register.citizenRegisterId)
				} catch (error) {
					console.log(error)
					console.log(`Falha ao enviar o registro de ${register.name}`)
				}
			})
		)
	}
}
