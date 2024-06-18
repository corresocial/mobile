import uuid from 'react-uuid'

import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntity, CitizenRegisterEntityOptional } from '../model/entities/types'

import { CitizenRegister } from '../model/entities/CitizenRegister'
import { CitizenRegisterLocalRepositoryInterface } from '../provider/CitizenRegisterLocalRepositoryInterface'

type Input = CitizenRegisterEntityOptional
type Output = Promise<string | void>

export class SaveCitizenRegisterOffline implements UseCase<Input, Output> {
	private localRepository: CitizenRegisterLocalRepositoryInterface
	private currentUser: any

	constructor(
		CitizenRegisterLocalRepository: Class<CitizenRegisterLocalRepositoryInterface>,
		currentUser: UserEntity // MODEL Type user
	) {
		this.localRepository = new CitizenRegisterLocalRepository()
		this.currentUser = currentUser // new User(currentUser)
	}

	async exec(citizenRegisterData: Input): Output { // CURRENT Teste
		const newCitizenRegister = {
			...citizenRegisterData,
			citizenRegisterId: citizenRegisterData.citizenRegisterId || uuid(),
			userId: this.currentUser.userId,
			name: citizenRegisterData.name || 'cidadão',
			censusTakerId: this.currentUser.userId || '',
			censusTakerName: this.currentUser.name || '',
			createdAt: new Date(),
		} as CitizenRegisterEntity

		const { data } = new CitizenRegister(newCitizenRegister, true)
		return this.localRepository.updateOfflineCitizenRegisters([data])
	}
}
