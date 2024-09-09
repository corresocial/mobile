import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type UnknowFunction = any

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>

	generatePhoneAuthCredential: (verificationCodeId: string, verificationCode: string) => Promise<FirebaseAuthTypes.AuthCredential>
	getPhoneVerificationCodeId: (completeNumber: string) => Promise<string | null>
	validatePhoneVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<FirebaseAuthTypes.UserCredential>

	signInByGoogleCredential: () => Promise<{ email: string, userId: string }>
	linkAuthProvider: () => Promise<FirebaseAuthTypes.User>
	unlinkAuthProvider: (providerId: string) => Promise<boolean>

}

export { AuthenticationServiceInterface }
