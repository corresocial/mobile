import { ApplicationVerifier, UserCredential } from 'firebase/auth'

import { ChatDomainInterface } from '@domain/chat/ChatDomainInterface'

import { PostRepositoryInterface } from '@data/post/PostRepositoryInterface'
import { StorageFolder } from '@data/user/remoteRepository/uploadUserMedia'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, UserEntityOptional, UserRegisterData, UserSubscription } from './entity/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

interface UserDomainInterface {
	syncWithRemoteUser: (useUserRepository: () => UserRepositoryInterface, uid?: string, localUserData?: UserEntity) => Promise<UserEntity | false>
	getLocalUserDataWithDeviceAuth: (useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) => Promise<UserEntity | null>
	getLocalUserData: (useUserRepository: () => UserRepositoryInterface) => Promise<UserEntity | null>
	getUnapprovedProfiles(useUserRepository: () => UserRepositoryInterface, pageSize?: number, lastUser?: UserEntity | any): Promise<UserEntity[] | void>
	userExists(useUserRepository: () => UserRepositoryInterface, userId?: string): Promise<boolean>

	requestPhoneVerificationCode: (useAuthenticationService: () => AuthenticationServiceInterface, completeNumber: string, recaptchaVerifier: ApplicationVerifier | any) => Promise<string>
	phoneVerificationCodeIsValid: (useAuthenticationService: () => AuthenticationServiceInterface, verificationCodeId: string, verificationCode: string) => Promise<UserCredential>

	createNewUser: (useUserRepository: () => UserRepositoryInterface, userData: UserRegisterData) => Promise<UserEntity | undefined>
	approveProfile(useUserRepository: () => UserRepositoryInterface, postData: UserEntity): Promise<UserEntity | void>
	rejectProfile(useUserRepository: () => UserRepositoryInterface, postData: UserEntity): Promise<UserEntity | void>

	updateUserRepository: (
		useUserRepository: () => UserRepositoryInterface,
		currentUserData: UserEntity,
		newUserData: UserEntityOptional
	) => Promise<UserEntity | undefined>
	updateUserSubscriptionData: (useUserRepository: () => UserRepositoryInterface, userData: UserEntity, subscriptionData: UserSubscription) => Promise<void>
	uploadUserMedia: (useUserRepository: () => UserRepositoryInterface, mediaUri: string[], folder: StorageFolder) => Promise<string[]>,

	logoutUser: (
		useUserRepository: () => UserRepositoryInterface,
		usePostRepository: () => PostRepositoryInterface,
		useChatDomain: () => ChatDomainInterface,
		removeChatListeners: () => void,
		userId: string
	) => Promise<void>
}

export { UserDomainInterface }
