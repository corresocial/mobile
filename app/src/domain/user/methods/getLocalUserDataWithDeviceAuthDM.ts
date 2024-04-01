import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity } from '../entity/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

async function getLocalUserDataWithDeviceAuthDM(useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) {
	try {
		const { handleMethodWithDeviceAuthentication } = useAuthenticationService()
		const { localStorage } = useUserRepository()

		const storedUser: UserEntity = await handleMethodWithDeviceAuthentication(localStorage.getLocalUserData)
		if (!storedUser) return null
		return storedUser
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getLocalUserDataWithDeviceAuthDM }
