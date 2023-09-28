import { User, getAuth, unlink } from 'firebase/auth'
import { unlinkUserEmailIdentifierOnAuthCloud } from '../../cloudFunctions/unlinkUserEmailIdentifierOnAuth'
import { Id } from '../types'

async function unlinkAuthProvider(providerId: string) {
	const auth = getAuth()
	const { currentUser } = auth

	console.log(currentUser)

	return unlink(currentUser as User, providerId)
		.then(async () => {
			await unlinkUserEmailIdentifierOnAuthCloud(currentUser?.uid as Id)
			return true
		})
		.catch((error) => {
			throw new Error(error.code)
		})
}

export { unlinkAuthProvider }
