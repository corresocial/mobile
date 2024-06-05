import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from '../entity/types'

async function rejectProfileDM(useUserRepository: () => UserRepositoryInterface, userData: UserEntity) {
	try {
		const { remoteStorage } = useUserRepository()

		await remoteStorage.updateUserData(userData.userId, { unapprovedData: { reject: true } })
		return userData
	} catch (error) {
		console.log(error)
	}
}

export { rejectProfileDM }
