import { UseCase } from '@domain/shared/interfaces/UseCase'

import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, VerifiedType } from '../entity/types'

type Input = { profileId: string }
type Output = Promise<VerifiedType | undefined>

export class RemoveVerificationBadge implements UseCase<Input, Output> {
	private userRemoteRepository: UserRepositoryInterface['remoteStorage']

	constructor(userRemoteRepository: UserRepositoryInterface['remoteStorage']) {
		this.userRemoteRepository = userRemoteRepository
	}

	async exec({ profileId }: Input): Output { // TEST
		if (!profileId) {
			throw new Error('Não foi possível identificar o perfil para a remoção do selo de verificação')
		}

		const verifiedObject = {
			verified: {} as UserEntity['verified']
		}

		await this.userRemoteRepository.updateUserData(profileId, verifiedObject)
		return verifiedObject.verified
	}
}
