import { AuthCredential, getAuth, linkWithCredential } from 'firebase/auth'

async function linkUserCredential(credential: AuthCredential) {
	const auth = getAuth()
	return linkWithCredential(auth.currentUser as any, credential)
		.then((usercred) => {
			const { user } = usercred
			console.log('Account linking success')
			return user
		}).catch((error) => {
			console.log(error)
			throw new Error(error.code)
		})
}

export { linkUserCredential }
