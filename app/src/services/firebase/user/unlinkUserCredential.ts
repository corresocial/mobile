import { User, getAuth, unlink } from 'firebase/auth'

async function unlinkUserCredential(providerId: string) {
	const auth = getAuth()
	const { currentUser } = auth

	return unlink(currentUser as User, providerId)
		.then(() => true)
		.catch((error) => {
			throw new Error(error.code)
		})
}

export { unlinkUserCredential }
