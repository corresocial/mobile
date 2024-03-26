import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from './entity/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

interface UserDomainInterface {
	getLocalUserDataWithDeviceAuth: (useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) => Promise<UserEntity | null>
	getLocalUserData: (useUserRepository: () => UserRepositoryInterface) => Promise<UserEntity | null>
}

export { UserDomainInterface }
