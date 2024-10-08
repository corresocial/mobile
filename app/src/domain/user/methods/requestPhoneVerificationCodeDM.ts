import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

async function requestPhoneVerificationCodeDM(useAuthenticationService: () => AuthenticationServiceInterface, completeNumber: string) {
	const { getPhoneVerificationCodeId } = useAuthenticationService()
	return getPhoneVerificationCodeId(completeNumber)
}

export { requestPhoneVerificationCodeDM }
