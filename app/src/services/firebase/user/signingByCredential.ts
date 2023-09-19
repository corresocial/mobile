import { OAuthCredential, signInWithCredential } from 'firebase/auth'
import { auth } from '..'

async function signinByCredential(googleCredential: OAuthCredential) {
	try {
		const userCredential = await signInWithCredential(auth, googleCredential)
		return { email: userCredential.user.email, userId: userCredential.user.uid }
	} catch (err) {
		console.log(err)
		return { email: '', userId: '' }
	}
}

export { signinByCredential }
