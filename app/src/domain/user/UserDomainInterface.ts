import { ApplicationVerifier, UserCredential } from 'firebase/auth'

import { ChatDomainInterface } from '@domain/chat/ChatDomainInterface'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, UserSubscription } from './entity/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

interface UserDomainInterface {
	getLocalUserDataWithDeviceAuth: (useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) => Promise<UserEntity | null>
	getLocalUserData: (useUserRepository: () => UserRepositoryInterface) => Promise<UserEntity | null>
	syncWithRemoteUser: (useUserRepository: () => UserRepositoryInterface, uid?: string, localUserData?: UserEntity) => Promise<UserEntity | false>

	requestPhoneVerificationCode: (useAuthenticationService: () => AuthenticationServiceInterface, completeNumber: string, recaptchaVerifier: ApplicationVerifier | any) => Promise<string>
	phoneVerificationCodeIsValid: (useAuthenticationService: () => AuthenticationServiceInterface, verificationCodeId: string, verificationCode: string) => Promise<UserCredential>

	updateUserSubscriptionData: (useUserRepository: () => UserRepositoryInterface, userData: UserEntity, subscriptionData: UserSubscription) => Promise<void>

	logoutUser: (
		useUserRepository: () => UserRepositoryInterface,
		usePostRepository: () => PostRepositoryInterface,
		useChatDomain: () => ChatDomainInterface,
		removeChatListeners: () => void,
		userId: string
	) => Promise<void>
}

export { UserDomainInterface }
