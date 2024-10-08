import { authProviders } from '@infrastructure/firebase'

async function generatePhoneAuthCredential(verificationCodeId: string, verificationCode: string) {
	const credential = authProviders.PhoneAuthProvider.credential(
		verificationCodeId,
		verificationCode,
	)

	return credential
}

export { generatePhoneAuthCredential }
