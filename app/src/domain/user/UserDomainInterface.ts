import { ApplicationVerifier, UserCredential } from 'firebase/auth'

import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from './entity/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

interface UserDomainInterface {
	getLocalUserDataWithDeviceAuth: (useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) => Promise<UserEntity | null>
	getLocalUserData: (useUserRepository: () => UserRepositoryInterface) => Promise<UserEntity | null>
	syncWithRemoteUser: (useUserRepository: () => UserRepositoryInterface, uid?: string, localUserData?: UserEntity) => Promise<UserEntity | false>

	requestPhoneVerificationCode: (useAuthenticationService: () => AuthenticationServiceInterface, completeNumber: string, recaptchaVerifier: ApplicationVerifier | any) => Promise<string>
	phoneVerificationCodeIsValid: (useAuthenticationService: () => AuthenticationServiceInterface, verificationCodeId: string, verificationCode: string) => Promise<UserCredential>
}

export { UserDomainInterface }
