import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type UnknowFunction = any
export type ProviderId = 'phone' | 'google.com'

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>

	generatePhoneAuthCredential: (verificationCodeId: string, verificationCode: string) => Promise<FirebaseAuthTypes.AuthCredential>
	getPhoneVerificationCodeId: (completeNumber: string) => Promise<string | null>
	validatePhoneVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<FirebaseAuthTypes.UserCredential>

	signInByGoogleCredential: (justReturnCredential?: boolean) => Promise<{ email: string, userId: string } | FirebaseAuthTypes.AuthCredential | null>
	linkAuthProvider: (authCredential: FirebaseAuthTypes.AuthCredential | null, providerId: ProviderId) => Promise<FirebaseAuthTypes.User | undefined>
	unlinkAuthProvider: (providerId: ProviderId) => Promise<boolean>

}

export { AuthenticationServiceInterface }
