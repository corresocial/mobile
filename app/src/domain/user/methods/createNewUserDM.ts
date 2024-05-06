import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, UserRegisterData } from '../entity/types'

import { remoteUserPrivateData } from '../core/removePrivateDataDM'

async function createNewUserDM(useUserRepository: () => UserRepositoryInterface, userData: UserRegisterData) {
	try {
		const { remoteStorage, localStorage } = useUserRepository()

		const filteredUserData = remoteUserPrivateData(userData)

		await remoteStorage.saveUserData(userData.userId!, filteredUserData)

		await remoteStorage.updatePrivateContacts(
			userData.userId!,
			{ cellNumber: userData.cellNumber || '', email: userData.email || '' }
		)

		const userWithIdentification = { ...filteredUserData, userId: userData.userId! }
		await localStorage.saveLocalUserData(userWithIdentification)

		return userWithIdentification as UserEntity
	} catch (error) {
		console.log(error)
	}
}

export { createNewUserDM }
