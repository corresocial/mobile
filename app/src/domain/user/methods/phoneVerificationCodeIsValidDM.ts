import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

async function phoneVerificationCodeIsValidDM(
	useAuthenticationService: () => AuthenticationServiceInterface,
	verificationCodeId: string,
	verificationCode: string
) {
	const { validatePhoneVerificationCode } = useAuthenticationService()
	return validatePhoneVerificationCode(verificationCodeId, verificationCode)
}

export { phoneVerificationCodeIsValidDM }
