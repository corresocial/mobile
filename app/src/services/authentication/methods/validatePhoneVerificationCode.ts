import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth'

import { auth } from '@infrastructure/firebase'

async function validatePhoneVerificationCode(verificationCodeId: string, verificationCode: string) {
	const credential = PhoneAuthProvider.credential(
		verificationCodeId,
		verificationCode,
	)

	const userCredential = await signInWithCredential(auth, credential)
	return userCredential
}

export { validatePhoneVerificationCode }
