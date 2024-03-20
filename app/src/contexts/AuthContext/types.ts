import { ReactNode } from 'react'

import { UserCredential } from 'firebase/auth'

import { PostCollection, UserCollection } from '@services/firebase/types'

export interface AuthProviderProps {
	children: ReactNode
}

export type UserData = UserCollection

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
