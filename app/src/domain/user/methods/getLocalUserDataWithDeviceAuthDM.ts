import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserCollection } from '@services/firebase/types'

import { AuthenticationServiceInterface } from '@services/authentication/AuthenticationServiceInterface'

async function getLocalUserDataWithDeviceAuthDM(useUserRepository: () => UserRepositoryInterface, useAuthenticationService: () => AuthenticationServiceInterface) {
	try {
		const { handleMethodWithDeviceAuthentication } = useAuthenticationService()
		const { localStorage } = useUserRepository()

		const storedUser: UserCollection = await handleMethodWithDeviceAuthentication(localStorage.getLocalUserData)
		if (!storedUser) return null
		return storedUser
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getLocalUserDataWithDeviceAuthDM }
