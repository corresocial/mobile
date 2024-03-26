import { AuthenticationServiceInterface } from './AuthenticationServiceInterface'
import { generatePhoneAuthCredential } from './methods/generatePhoneAuthCredential'
import { generateGoogleAuthCredential } from './methods/geneteGoogleAuthCredential'
import { handleMethodWithDeviceAuthentication } from './methods/handleMethodWithDeviceAuthentication'
import { linkAuthProvider } from './methods/linkAuthProvider'
import { signInByGoogleCredential } from './methods/signInByGoogleCredential'
import { unlinkAuthProvider } from './methods/unlinkAuthProvider'

function useAuthenticationService(): AuthenticationServiceInterface {
	return {
		handleMethodWithDeviceAuthentication: handleMethodWithDeviceAuthentication,

		generatePhoneAuthCredential: generatePhoneAuthCredential,
		generateGoogleAuthCredential: generateGoogleAuthCredential,

		signInByGoogleCredential: signInByGoogleCredential,
		linkAuthProvider: linkAuthProvider,
		unlinkAuthProvider: unlinkAuthProvider
	}
}

export { useAuthenticationService }
