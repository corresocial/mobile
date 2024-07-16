import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

async function syncWithRemoteUserDM(useUserRepository: () => UserRepositoryInterface, userId?: string) {
	const { localStorage, remoteStorage } = useUserRepository()

	console.log('[user] sync', userId)
	if (userId) {
		const currentUser = await remoteStorage.getUserData(userId)
		if (currentUser && currentUser.userId) {
			await localStorage.saveLocalUserData({ ...currentUser })
			return { ...currentUser }
		}
	}

	const hasValidLocalUser = await localStorage.hasValidLocalUser()
	const localUserData = await localStorage.getLocalUserData()

	if (hasValidLocalUser && localUserData) {
		return localUserData
	}

	console.log('Nenhum usuário local localizado')
	return false
}

export { syncWithRemoteUserDM }
