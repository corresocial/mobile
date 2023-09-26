import { OAuthCredential, getAuth, unlink } from 'firebase/auth'

async function unlinkUserCredential(credential: OAuthCredential) {
	const auth = getAuth()
	return unlink(auth.currentUser as any, credential.providerId)
		.then(() => true)
		.catch((error) => {
			throw new Error(error.code)
		})
}

export { unlinkUserCredential }
