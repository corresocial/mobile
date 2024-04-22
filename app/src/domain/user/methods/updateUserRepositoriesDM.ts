import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, UserEntityOptional } from '../entity/types'

async function updateUserRepositoryDM(
	useUserRepository: () => UserRepositoryInterface,
	currentUserData: UserEntity,
	newUserData: UserEntityOptional
) {
	try {
		const { remoteStorage, localStorage } = useUserRepository()

		const newUserRepository = { ...currentUserData, ...newUserData }

		await remoteStorage.updateUserData(currentUserData.userId, { ...newUserData })
		await localStorage.saveLocalUserData(newUserRepository)

		return newUserRepository
	} catch (error) {
		console.log(error)
	}
}

export { updateUserRepositoryDM }
