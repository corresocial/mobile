import { ApplicationVerifier, AuthCredential, OAuthCredential, PhoneAuthCredential, User, UserCredential } from 'firebase/auth'

type UnknowFunction = any

interface AuthenticationServiceInterface {
	handleMethodWithDeviceAuthentication: (secureMethod: UnknowFunction) => Promise<any>

	generatePhoneAuthCredential: (verificationCodeId: string, verificationCode: string) => Promise<PhoneAuthCredential>
	generateGoogleAuthCredential: (accessTokenId: string) => OAuthCredential
	getPhoneVerificationCodeId: (completeNumber: string, recaptchaVerifier: ApplicationVerifier | any) => Promise<string>
	validatePhoneVerificationCode: (verificationCodeId: string, verificationCode: string) => Promise<UserCredential>

	signInByGoogleCredential: (googleCredential: OAuthCredential) => Promise<{ email: string, userId: string }>
	linkAuthProvider: (credential: AuthCredential) => Promise<User>
	unlinkAuthProvider: (providerId: string) => Promise<boolean>

}

export { AuthenticationServiceInterface }
