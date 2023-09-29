import { User, getAuth, unlink } from 'firebase/auth'

async function unlinkAuthProvider(providerId: string) {
	const auth = getAuth()
	const { currentUser } = auth

	return unlink(currentUser as User, providerId)
		.then(async () => {
			return true
		})
		.catch((error) => {
			throw new Error(error.code)
		})
}

export { unlinkAuthProvider }
