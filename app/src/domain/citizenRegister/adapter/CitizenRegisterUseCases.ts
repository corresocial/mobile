import { Class } from '@domain/shared/interfaces/Class'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterLocalRepository } from '@data/citizenRegister/CitizenRegisterLocalRepository'
import { CitizenRegisterRemoteRepository } from '@data/citizenRegister/CitizenRegisterRemoteRepository'

import { CitizenRegisterEntityOptional } from '../model/entities/types'

import { CloudFunctionServiceInterface } from '@services/cloudFunctions/CloudFunctionServiceInterface'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'
import { CitizenHasAccountOnApp } from '../useCases/CitizenHasAccountOnApp'
import { CreateCitizenRegister } from '../useCases/CreateCitizenRegister'
import { DeleteOfflineCitizenRegister } from '../useCases/DeleteOfflineCitizenRegister'
import { GetCitizenRegistrationQuestionary } from '../useCases/GetCitizenRegistrationQuestionary'
import { GetOfflineCitizenRegisters } from '../useCases/GetOfflineCitizenRegisters'
import { SaveCitizenRegisterOffline } from '../useCases/SaveCitizenRegisterOffline'
import { SendOfflineRegisters } from '../useCases/SendOfflineRegisters'

interface FinanceUseCasesProps {
	localRepository: Class<CitizenRegisterLocalRepositoryInterface>
	remoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>
}

export class CitizenRegisterUseCases {
	private localRepository: Class<CitizenRegisterLocalRepositoryInterface>
	private remoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>

	constructor(props?: FinanceUseCasesProps) {
		this.localRepository = props?.localRepository || CitizenRegisterLocalRepository
		this.remoteRepository = props?.remoteRepository || CitizenRegisterRemoteRepository
	}

	getCitizenRegistrationQuestionary() {
		return new GetCitizenRegistrationQuestionary().exec()
	}

	createCitizenRegister(currentUser: UserEntity, citizenRegisterData: CitizenRegisterEntityOptional) {
		return new CreateCitizenRegister(this.remoteRepository, currentUser).exec(citizenRegisterData)
	}

	saveCitizenRegisterOffline(currentUser: UserEntity, citizenRegisterData: CitizenRegisterEntityOptional) {
		return new SaveCitizenRegisterOffline(this.localRepository, currentUser).exec(citizenRegisterData)
	}

	getOfflineCitizenRegisters() {
		return new GetOfflineCitizenRegisters(this.localRepository).exec()
	}

	sendOfflineRegisters() {
		return new SendOfflineRegisters(this.localRepository, this.remoteRepository).exec()
	}

	deleteOfflineCitizenRegister(citizenRegisterId: string) {
		return new DeleteOfflineCitizenRegister(this.localRepository).exec(citizenRegisterId)
	}

	citizenHasAccountOnApp(useCloudFunctionService: () => CloudFunctionServiceInterface, cellNumber: string) { // MODEL
		return new CitizenHasAccountOnApp(useCloudFunctionService).exec(cellNumber)
	}
}
