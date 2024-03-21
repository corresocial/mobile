import { PhoneAuthProvider } from 'firebase/auth'

const getPhoneAuthCredential = async (verificationCodeId: string, verificationCode: string) => {
	const credential = PhoneAuthProvider.credential(
		verificationCodeId,
		verificationCode,
	)

	return credential
}

export { getPhoneAuthCredential }
