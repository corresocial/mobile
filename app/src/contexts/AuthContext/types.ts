import { ReactNode } from 'react'

import { UserCredential } from 'firebase/auth'

import { PostCollection, UserCollection } from '@services/firebase/types'

export interface AuthProviderProps {
	children: ReactNode
}

export type AuthContextType = {
	userDataContext: UserCollection
	setUserDataOnContext: (data: UserCollection) => void
	getUserDataFromSecureStore: (requireAuthentication?: boolean, accountIdentifier?: boolean) => Promise<UserCollection>
	hasValidLocalUser: () => Promise<boolean>
	setDataOnSecureStore: (key: string, data: any) => Promise<boolean>
	deleteLocaluser: () => Promise<void>
	setRemoteUserOnLocal: (uid?: string, userData?: UserCollection) => Promise<boolean | undefined>
	getLastUserPost: () => PostCollection
	sendSMS: (completeNumber: string, recaptchaVerifier: any) => Promise<string>
	validateVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<UserCredential>
}
