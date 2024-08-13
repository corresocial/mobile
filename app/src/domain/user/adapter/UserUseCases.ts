import { Class } from '@domain/shared/interfaces/Class'

import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'
import { useUserRepository } from '@data/user/useUserRepository'

import { UserEntity, VerifiedLabelName } from '../entity/types'

import { AlgoliaService } from '@services/algolia/AlgoliaService'

import { AlgoliaServiceInterface } from '../provider/AlgoliaServiceInterface'
import { RemoveVerificationBadge } from '../useCases/RemoveVerificationBadge'
import { SearchProfile } from '../useCases/SearchProfile'
import { SetVerificationBadge } from '../useCases/SetVerificationBadge'

interface UserUseCasesProps {
	algoliaService: Class<AlgoliaServiceInterface>
	userRepository: () => UserRepositoryInterface
}

export class UserUseCases {
	private algoliaService: Class<AlgoliaServiceInterface>
	private userRemoteRepository: UserRepositoryInterface['remoteStorage']

	constructor(props?: UserUseCasesProps) {
		this.algoliaService = props?.algoliaService || AlgoliaService
		this.userRemoteRepository = props?.userRepository().remoteStorage || useUserRepository().remoteStorage
	}

	searchProfile(searchText: string, pageNumber: number) {
		return new SearchProfile(this.algoliaService).exec({ searchText, pageNumber })
	}

	setVerificationBadge(currentUser: UserEntity, profileBadge: VerifiedLabelName, profileId: string, coordinatorId?: string) {
		const props = {
			profileBadge: profileBadge,
			profileId: profileId,
			coordinatorId: coordinatorId
		}
		return new SetVerificationBadge(this.userRemoteRepository, currentUser).exec(props)
	}

	removeVerificationBadge(profileId: string) {
		return new RemoveVerificationBadge(this.userRemoteRepository).exec({ profileId })
	}
}
