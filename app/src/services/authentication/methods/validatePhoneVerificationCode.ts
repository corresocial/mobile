import { signInWithCredential } from '@react-native-firebase/auth'

import { authProviders, firebaseAuth } from '@infrastructure/firebase'

async function validatePhoneVerificationCode(verificationCodeId: string, verificationCode: string) {
	try {
		const credential = authProviders.PhoneAuthProvider.credential(verificationCodeId, verificationCode)
		const userCredential = await signInWithCredential(firebaseAuth, credential)
		return userCredential
	} catch (error) {
		console.log('Erro na validação do código de verificação:', error)
		throw error
	}
}

export { validatePhoneVerificationCode }
