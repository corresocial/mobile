import { AuthCredential, OAuthCredential, PhoneAuthCredential, User } from 'firebase/auth'

type UnknowFunction = any

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>

	generatePhoneAuthCredential: (verificationCodeId: string, verificationCode: string) => Promise<PhoneAuthCredential>
	generateGoogleAuthCredential: (accessTokenId: string) => OAuthCredential

	signInByGoogleCredential: (googleCredential: OAuthCredential) => Promise<{ email: string, userId: string }>
	linkAuthProvider: (credential: AuthCredential) => Promise<User>
	unlinkAuthProvider: (providerId: string) => Promise<boolean>

}

export { AuthenticationServiceInterface }
