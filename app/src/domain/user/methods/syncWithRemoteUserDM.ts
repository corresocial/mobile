import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

async function syncWithRemoteUserDM(useUserRepository: () => UserRepositoryInterface, userId?: string) {
	const { localStorage, remoteStorage } = useUserRepository()

	if (userId) {
		const currentUser = await remoteStorage.getUserData(userId)
		if (currentUser && currentUser.userId) {
			await localStorage.saveLocalUserData({ ...currentUser })
			return { ...currentUser }
		}
	}

	const localUserData = await localStorage.getLocalUserData()

	if (localUserData) {
		return localUserData
	}

	console.log('Nenhum usuário local localizado')
	return false
}

export { syncWithRemoteUserDM }
