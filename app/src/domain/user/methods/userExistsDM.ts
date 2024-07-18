import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

async function userExistsDM(useUserRepository: () => UserRepositoryInterface, userId?: string) {
	const { remoteStorage } = useUserRepository()

	console.log('userExists', userId)
	if (userId) {
		const currentUser = await remoteStorage.getUserData(userId)
		if (currentUser && currentUser.userId && currentUser.name) {
			return true
		}
	}

	return false
}

export { userExistsDM }
