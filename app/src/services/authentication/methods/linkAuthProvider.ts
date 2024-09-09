import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { getEnvVars } from '@infrastructure/environment'
import { authProviders, firebaseAuth } from '@infrastructure/firebase'

async function linkAuthProvider() {
	try {
		const currentUser = firebaseAuth?.currentUser
		if (!currentUser) {
			throw new Error('No current user')
		}

		const { AUTH_IOS_CLIENT_ID } = getEnvVars()

		await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
		GoogleSignin.configure({
			webClientId: AUTH_IOS_CLIENT_ID,
			iosClientId: AUTH_IOS_CLIENT_ID
		})

		const { data } = await GoogleSignin.signIn()
		const googleCredential = authProviders.GoogleAuthProvider.credential(data?.idToken!)

		const { user } = await currentUser.linkWithCredential(googleCredential)
		console.log('Account linking success')
		return user
	} catch (error: any) {
		console.log(error)
		throw Error(error.code ? error.code : error)
	}
}

export { linkAuthProvider }
