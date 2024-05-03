import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from '../entity/types'

async function syncWithRemoteUserDM(useUserRepository: () => UserRepositoryInterface, userId?: string, localUserData?: UserEntity) {
	const { localStorage, remoteStorage } = useUserRepository()

	if (userId) {
		const currentUser = await remoteStorage.getUserData(userId)
		if (currentUser && currentUser.userId) {
			await localStorage.saveLocalUserData({ ...currentUser })
			return { ...currentUser }
		}

		return { ...localUserData } as UserEntity
	}

	if (localUserData?.userId && localUserData?.userId === userId) {
		const currentUser = { ...localUserData } as UserEntity
		return currentUser
	}

	console.log('Nenhum usuário local localizado')
	return false
}

export { syncWithRemoteUserDM }
