import { AuthCredential, User, UserCredential } from '@react-native-firebase/auth'

type UnknowFunction = any
export type ProviderId = 'phone' | 'google.com'

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>

	generatePhoneAuthCredential: (verificationCodeId: string, verificationCode: string) => Promise<AuthCredential>
	getPhoneVerificationCodeId: (completeNumber: string) => Promise<string | null>
	validatePhoneVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<UserCredential>

	signInByGoogleCredential: (justReturnCredential?: boolean) => Promise<{ email: string, userId: string } | AuthCredential | null>
	linkAuthProvider: (authCredential: AuthCredential | null, providerId: ProviderId) => Promise<User | undefined>
	unlinkAuthProvider: (providerId: ProviderId) => Promise<boolean>

}

export { AuthenticationServiceInterface }
