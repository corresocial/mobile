import { Class } from '@domain/shared/interfaces/Class'
import { UseCase } from '@domain/shared/interfaces/UseCase'
import { UserEntity } from '@domain/user/entity/types'

import { CitizenRegisterEntity } from '../model/entities/types'

import { CitizenRegisterRemoteRepositoryInterface } from '../provider/CitizenRegisterRemoteRepositoryInterface'

type Input = { maxDocs?: number, lastCitizenRegister?: CitizenRegisterEntity | null }
type Output = Promise<CitizenRegisterEntity[]>

export class GetCitizenRegistrationsByCoordinatorResponsability implements UseCase<Input, Output> {
	private remoteRepository: CitizenRegisterRemoteRepositoryInterface
	private currentUser: UserEntity

	constructor(
		CitizenRegisterRemoteRepository: Class<CitizenRegisterRemoteRepositoryInterface>,
		currentUser: UserEntity
	) {
		this.remoteRepository = new CitizenRegisterRemoteRepository()
		this.currentUser = currentUser
	}

	async exec({ maxDocs, lastCitizenRegister }: Input): Output { // TEST
		if (!this.currentUser.userId) {
			throw new Error('Não foi possível identificar o coordenador')
		}

		// CURRENT remover comentário
		// if (!(this.currentUser && this.currentUser.verified && this.currentUser.verified.type === 'coordinator')) {
		// 	throw new Error('Você não tem permissão suficiente para acompanhar os cadastros dos aplicadores de questionário')
		// }

		return this.remoteRepository.getCitizenRegistrationsByCoordinator(this.currentUser.userId, maxDocs, lastCitizenRegister)
	}
}
