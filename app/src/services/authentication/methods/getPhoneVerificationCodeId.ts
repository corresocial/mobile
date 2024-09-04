import { firebaseAuth } from '@infrastructure/firebase'

async function getPhoneVerificationCodeId(completeNumber: string) {
	try {
		const confirmation = await firebaseAuth.signInWithPhoneNumber(completeNumber)
		return confirmation.verificationId
	} catch (err: any) {
		console.log(err.code)
		console.log(err)
		switch (err.code) {
			case 'auth/too-many-requests':
				throw new Error('auth/too-many-requests')
			default:
				throw new Error('Houve um erro ao tentar lhe enviar o código de verificação!')
		}
	}
}

export { getPhoneVerificationCodeId }
