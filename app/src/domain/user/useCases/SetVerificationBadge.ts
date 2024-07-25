import { UseCase } from '@domain/shared/interfaces/UseCase'

import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, VerifiedLabelName, VerifiedType } from '../entity/types'

type Input = { profileBadge: VerifiedLabelName, profileId: string, coordinatorId?: string }
type Output = Promise<VerifiedType | undefined>

export class SetVerificationBadge implements UseCase<Input, Output> {
	private userRemoteRepository: UserRepositoryInterface['remoteStorage']
	private currentUser: any

	constructor(
		userRemoteRepository: UserRepositoryInterface['remoteStorage'],
		currentUser: UserEntity // MODEL Type user
	) {
		this.userRemoteRepository = userRemoteRepository
		this.currentUser = currentUser
	}

	async exec({ profileBadge, profileId, coordinatorId }: Input): Output { // TEST
		if (!profileId || !this.currentUser.userId || !profileBadge) {
			throw new Error('Não foram fornecidos todos os parâmetros para conceder permissões à este usuário')
		}

		if (coordinatorId) {
			const coordinator = await this.userRemoteRepository.getUserData(coordinatorId)
			if (!(coordinator && coordinator.verified && coordinator.verified.type === 'coordinator')) {
				throw new Error('O perfil selecionado não é um coordenador')
			}
		}

		const verifiedObject = {
			verified: {
				type: profileBadge,
				by: this.currentUser.userId,
				at: new Date(),
				name: this.currentUser.name || '',
				coordinatorId: coordinatorId || ''
			}
		}

		await this.userRemoteRepository.updateUserData(profileId, verifiedObject)
		return verifiedObject.verified
	}
}
