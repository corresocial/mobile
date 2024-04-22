import { GoogleAuthProvider } from 'firebase/auth'

function generateGoogleAuthCredential(accessTokenId: string) {
	return GoogleAuthProvider.credential(null, accessTokenId)
}

export { generateGoogleAuthCredential }
