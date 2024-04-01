import { PhoneAuthProvider } from 'firebase/auth'

async function generatePhoneAuthCredential(verificationCodeId: string, verificationCode: string) {
	const credential = PhoneAuthProvider.credential(
		verificationCodeId,
		verificationCode,
	)

	return credential
}

export { generatePhoneAuthCredential }
