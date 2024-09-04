import { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { firebaseAuth } from '@infrastructure/firebase'

async function linkAuthProvider(credential: FirebaseAuthTypes.AuthCredential) {
	try {
		const currentUser = firebaseAuth?.currentUser
		if (!currentUser) {
			throw new Error('No current user')
		}

		const usercred = await currentUser.linkWithCredential(credential)
		const { user } = usercred
		console.log('Account linking success')
		return user
	} catch (error: any) {
		console.log(error)
		throw Error(error.code ? error.code : error)
	}
}

export { linkAuthProvider }
