import { GoogleSignin } from '@react-native-google-signin/google-signin'
import { Alert } from 'react-native'

import { getEnvVars } from '@infrastructure/environment'
import { authProviders, firebaseAuth } from '@infrastructure/firebase'

async function signInByGoogleCredential() {
	try {
		const { AUTH_IOS_CLIENT_ID, AUTH_WEB_CLIENT_ID } = getEnvVars()
		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
		GoogleSignin.configure({
			webClientId: AUTH_WEB_CLIENT_ID,
			iosClientId: AUTH_IOS_CLIENT_ID,
			offlineAccess: true
		})
		const res = await GoogleSignin.signIn()
		if (!res || (res && !res.data)) return { email: '', userId: '' }

		const googleCredential = authProviders.GoogleAuthProvider.credential(res.data?.idToken!)
		const userCredential = await firebaseAuth.signInWithCredential(googleCredential)
		const user = userCredential?.user
		return {
			email: user?.email || '',
			userId: user?.uid || ''
		}
	} catch (err) {
		console.log(err)
		Alert.alert('res', err ? JSON.stringify(err) : 'nulo') // CURRENT
		return { email: '', userId: '' }
	}
}

export { signInByGoogleCredential }
