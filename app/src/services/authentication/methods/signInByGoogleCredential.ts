import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { getEnvVars } from '@infrastructure/environment'
import { authProviders, firebaseAuth } from '@infrastructure/firebase'

async function signInByGoogleCredential(justReturnCredential?: boolean) {
	try {
		const { AUTH_WEB_CLIENT_ID, AUTH_IOS_CLIENT_ID } = getEnvVars()
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })

		GoogleSignin.configure({
			webClientId: AUTH_WEB_CLIENT_ID,
			iosClientId: AUTH_IOS_CLIENT_ID,
			offlineAccess: true,
			scopes: [],
			forceCodeForRefreshToken: true,
			profileImageSize: 120
		})

		const hasPreviousSignIn = GoogleSignin.hasPreviousSignIn()
		if (hasPreviousSignIn) {
			await GoogleSignin.signOut()
		}

		const res = await GoogleSignin.signIn()
		if (!res || (res && !res.data)) {
			if (justReturnCredential) return null
			return { email: '', userId: '' }
		}

		const googleCredential = authProviders.GoogleAuthProvider.credential(res.data?.idToken!)

		if (justReturnCredential) {
			return googleCredential
		}

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
