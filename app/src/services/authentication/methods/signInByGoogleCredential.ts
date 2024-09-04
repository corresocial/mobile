import { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { firebaseAuth } from '@infrastructure/firebase'

async function signInByGoogleCredential(googleCredential: FirebaseAuthTypes.AuthCredential) {
	try {
		const userCredential = await firebaseAuth.signInWithCredential(googleCredential)
		const user = userCredential?.user
		return {
			email: user?.email || '',
			userId: user?.uid || ''
		}
	} catch (err) {
		console.log(err)
		return { email: '', userId: '' }
	}
}

export { signInByGoogleCredential }
