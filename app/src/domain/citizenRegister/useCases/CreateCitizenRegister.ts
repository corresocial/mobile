import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntity, CitizenRegisterEntityOptional } from '../model/entities/types'

import { CitizenRegister } from '../model/entities/CitizenRegister'
import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'

type Input = CitizenRegisterEntityOptional
type Output = Promise<CitizenRegisterEntity>

export class CreateCitizenRegister implements UseCase<Input, Output> {
	private remoteRepository: CitizenRegisterRemoteRepositoryInterface
	private currentUser: any

	constructor(
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>,
		currentUser: UserEntity // MODEL Type user
	) {
		this.remoteRepository = new CitizenRegisterRemoteRepository()
		this.currentUser = currentUser // new User(currentUser)
	}

	async exec(citizenRegisterData: Input): Output { // CURRENT Teste
		const newCitizenRegister = {
			...citizenRegisterData,
			userId: this.currentUser.userId,
			name: citizenRegisterData.name || 'cidadão',
			censusTakerId: this.currentUser.userId || '',
			censusTakerName: this.currentUser.name || '',
			createdAt: new Date(),
		} as CitizenRegisterEntity

		const { data } = new CitizenRegister(newCitizenRegister, true)
		const savedCitizenRegister = await this.remoteRepository.createCitizenRegister(data)
		return savedCitizenRegister
	}
}
