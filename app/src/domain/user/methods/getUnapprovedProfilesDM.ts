import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from '../entity/types'

async function getUnapprovedProfilesDM(useUserRepository: () => UserRepositoryInterface, pageSize?: number, lastUser?: UserEntity | any) {
	try {
		const { remoteStorage } = useUserRepository()

		const lastUserData = lastUser ? { ...lastUser } : null

		return remoteStorage.getUnapprovedProfiles(pageSize, lastUserData)
	} catch (error) {
		console.log(error)
	}
}

export { getUnapprovedProfilesDM }
