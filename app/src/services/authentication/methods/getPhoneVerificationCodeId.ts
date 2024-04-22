import { ApplicationVerifier, PhoneAuthProvider } from 'firebase/auth'

import { auth } from '@infrastructure/firebase'

async function getPhoneVerificationCodeId(completeNumber: string, recaptchaVerifier: ApplicationVerifier | any) {
	const phoneAuth = new PhoneAuthProvider(auth)

	const verificationCodeId = await phoneAuth.verifyPhoneNumber(
		completeNumber,
		recaptchaVerifier,
	)
		.then((codeId) => codeId)
		.catch((err: any) => {
			console.log(err.code)
			switch (err.code) {
				case 'auth/too-many-requests': throw new Error('auth/too-many-requests')
				default: throw new Error('Houve um erro ao tentar lhe enviar o código de verificação!')
			}
		})

	return verificationCodeId
}

export { getPhoneVerificationCodeId }
