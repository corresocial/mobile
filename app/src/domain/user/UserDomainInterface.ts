import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserCollection } from '@services/firebase/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

interface UserDomainInterface {
	getLocalUserDataWithDeviceAuth: (useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) => Promise<UserCollection | null>
	getLocalUserData: (useUserRepository: () => UserRepositoryInterface) => Promise<UserCollection | null>
}

export { UserDomainInterface }
