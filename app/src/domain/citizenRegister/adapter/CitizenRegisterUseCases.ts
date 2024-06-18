import { Class } from '@domain/shared/interfaces/Class'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntityOptional } from '../model/entities/types'

import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'
import { CreateCitizenRegister } from '../useCases/CreateCitizenRegister'
import { SaveCitizenRegisterOffline } from '../useCases/SaveCitizenRegisterOffline'

export class CitizenRegisterUseCases {
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
}
