import { firebaseAuth } from '@infrastructure/firebase'

async function unlinkAuthProvider(providerId: string): Promise<boolean> {
	try {
		const currentUser = firebaseAuth?.currentUser
		if (!currentUser) {
			throw new Error('No current user')
		}

		await currentUser.unlink(providerId)
		return true
	} catch (error: any) {
		console.error(error)
		throw new Error(error.code || 'An error occurred while unlinking the provider')
	}
}

export { unlinkAuthProvider }
