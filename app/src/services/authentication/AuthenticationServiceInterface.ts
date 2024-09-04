import { FirebaseAuthTypes } from '@react-native-firebase/auth'

type UnknowFunction = any

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>

	generatePhoneAuthCredential: (verificationCodeId: string, verificationCode: string) => Promise<FirebaseAuthTypes.AuthCredential>
	generateGoogleAuthCredential: (accessTokenId: string) => FirebaseAuthTypes.AuthCredential
	getPhoneVerificationCodeId: (completeNumber: string) => Promise<string | null>
	validatePhoneVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<FirebaseAuthTypes.UserCredential>

	signInByGoogleCredential: (googleCredential: FirebaseAuthTypes.AuthCredential) => Promise<{ email: string, userId: string }>
	linkAuthProvider: (credential: FirebaseAuthTypes.AuthCredential) => Promise<FirebaseAuthTypes.User>
	unlinkAuthProvider: (providerId: string) => Promise<boolean>

}

export { AuthenticationServiceInterface }
