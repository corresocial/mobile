import { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { firebaseAuth } from '@infrastructure/firebase'

import { ProviderId } from '../AuthenticationServiceInterface'

async function linkAuthProvider(authCredential: FirebaseAuthTypes.AuthCredential | null, providerId: ProviderId) {
	try {
		const currentUser = firebaseAuth?.currentUser
		if (!currentUser) {
			throw new Error('No current user')
		}

		if (providerId === 'phone') {
			const { user } = await currentUser.linkWithCredential(authCredential!)
			return user
		}

		if (providerId === 'google.com') {
			const { user } = await currentUser.linkWithCredential(authCredential!)
			return user
		}
	} catch (error: any) {
		console.log(error)
		throw Error(error.code ? error.code : error)
	}
}

export { linkAuthProvider }
