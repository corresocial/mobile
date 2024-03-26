import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from '../entity/types'

const syncWithRemoteUserDM = async (useUserRepository: () => UserRepositoryInterface, uid?: string, localUserData?: UserEntity) => {
	const { localStorage, remoteStorage } = useUserRepository()

	if (uid) {
		const currentUser = await remoteStorage.getUserData(uid)
		if (currentUser && currentUser.userId) {
			await localStorage.saveLocalUserData({ ...currentUser, userId: uid })
			return { ...currentUser, userId: uid }
		}

		return { ...localUserData, userId: uid }
	}

	if (localUserData?.userId) {
		const currentUser = { ...localUserData }
		return currentUser
	}

	console.log('Nenhum usuário local localizado')
	return false
}

export { syncWithRemoteUserDM }
