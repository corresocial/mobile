import { ApplicationVerifier } from 'firebase/auth'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

async function requestPhoneVerificationCodeDM(useAuthenticationService: () => AuthenticationServiceInterface, completeNumber: string, recaptchaVerifier: ApplicationVerifier | any | any) {
	const { getPhoneVerificationCodeId } = useAuthenticationService()

	return getPhoneVerificationCodeId(completeNumber, recaptchaVerifier)
}

export { requestPhoneVerificationCodeDM }
