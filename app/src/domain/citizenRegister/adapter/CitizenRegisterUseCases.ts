import { Class } from '@domain/shared/interfaces/Class'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntityOptional } from '../model/entities/types'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'
import { CreateCitizenRegister } from '../useCases/CreateCitizenRegister'
import { DeleteOfflineCitizenRegister } from '../useCases/DeleteOfflineCitizenRegister'
import { GetOfflineCitizenRegisters } from '../useCases/GetOfflineCitizenRegisters'
import { SaveCitizenRegisterOffline } from '../useCases/SaveCitizenRegisterOffline'
import { SendOfflineRegisters } from '../useCases/SendOfflineRegisters'

export class CitizenRegisterUseCases {
	dontRemoveThisMethod() { } // Impede que a classe seja apenas um object, guardando muito cacheamento

	static createCitizenRegister(
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>,
		currentUser: UserEntity,
		citizenRegisterData: CitizenRegisterEntityOptional
	) {
		return new CreateCitizenRegister(CitizenRegisterRemoteRepository, currentUser).exec(citizenRegisterData)
	}

	static saveCitizenRegisterOffline(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
		currentUser: UserEntity,
		citizenRegisterData: CitizenRegisterEntityOptional
	) {
		return new SaveCitizenRegisterOffline(CitizenRegisterLocalRepository, currentUser).exec(citizenRegisterData)
	}

	static getOfflineCitizenRegisters(CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>) {
		return new GetOfflineCitizenRegisters(CitizenRegisterLocalRepository).exec()
	}

	static sendOfflineRegisters(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>
	) {
		return new SendOfflineRegisters(CitizenRegisterLocalRepository, CitizenRegisterRemoteRepository).exec()
	}

	static deleteOfflineCitizenRegister(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
		citizenRegisterId: string
	) {
		return new DeleteOfflineCitizenRegister(CitizenRegisterLocalRepository).exec(citizenRegisterId)
	}
}
