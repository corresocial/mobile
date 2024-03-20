import { ReactNode } from 'react'

import { UserCredential } from 'firebase/auth'

import { PostCollection, UserCollection } from '@services/firebase/types'

export interface AuthProviderProps {
	children: ReactNode
}

export type UserData = UserCollection

export type UserIdentification = { // REFACTOR Mover para autenticação
	uid: string
	authTime?: string
	accessToken?: string
	tokenExpirationTime?: string
	refreshToken?: string
}

export type RegisterUserData = { // Dados de registro exclusivos do contexto
	cellNumber: string
	email?: string
	userName: string
	profilePictureUri?: string
	userIdentification: UserIdentification
}

export interface LocalUserData extends UserCollection {
	userId?: string,
	userIdentification?: UserIdentification
}

export type AuthContextType = {
	userDataContext: UserData
	setUserDataOnContext: (data: UserData) => void
	getUserDataFromSecureStore: (requireAuthentication?: boolean, accountIdentifier?: boolean) => Promise<UserData>
	hasValidLocalUser: () => Promise<boolean>
	setDataOnSecureStore: (key: string, data: any) => Promise<boolean>
	deleteLocaluser: () => Promise<void>
	setRemoteUserOnLocal: (uid?: string, userData?: UserData) => Promise<boolean | undefined>
	getLastUserPost: () => PostCollection
	sendSMS: (completeNumber: string, recaptchaVerifier: any) => Promise<string>
	validateVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<UserCredential>
}
