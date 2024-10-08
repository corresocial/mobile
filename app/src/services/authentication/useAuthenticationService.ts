import { AuthenticationServiceInterface } from './AuthenticationServiceInterface'
import { generatePhoneAuthCredential } from './methods/generatePhoneAuthCredential'
import { getPhoneVerificationCodeId } from './methods/getPhoneVerificationCodeId'
import { handleMethodWithDeviceAuthentication } from './methods/handleMethodWithDeviceAuthentication'
import { linkAuthProvider } from './methods/linkAuthProvider'
import { signInByGoogleCredential } from './methods/signInByGoogleCredential'
import { unlinkAuthProvider } from './methods/unlinkAuthProvider'
import { validatePhoneVerificationCode } from './methods/validatePhoneVerificationCode'

function useAuthenticationService(): AuthenticationServiceInterface {
	return {
		handleMethodWithDeviceAuthentication: handleMethodWithDeviceAuthentication,

		generatePhoneAuthCredential: generatePhoneAuthCredential,
		getPhoneVerificationCodeId: getPhoneVerificationCodeId,
		validatePhoneVerificationCode: validatePhoneVerificationCode,

		signInByGoogleCredential: signInByGoogleCredential,
		linkAuthProvider: linkAuthProvider,
		unlinkAuthProvider: unlinkAuthProvider
	}
}

export { useAuthenticationService }
