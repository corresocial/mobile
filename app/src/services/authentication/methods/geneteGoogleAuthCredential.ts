import { authProviders } from '@infrastructure/firebase'

function generateGoogleAuthCredential(accessTokenId: string) {
	return authProviders.GoogleAuthProvider.credential(null, accessTokenId)
}

export { generateGoogleAuthCredential }
