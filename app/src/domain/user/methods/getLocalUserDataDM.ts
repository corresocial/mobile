import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

async function getLocalUserDataDM(useUserRepository: () => UserRepositoryInterface) {
	try {
		const { localStorage } = useUserRepository()

		const storedUser = await localStorage.getLocalUserData()
		if (!storedUser) return null

		return storedUser
	} catch (error) {
		console.log(error)
		return null
	}
}

export { getLocalUserDataDM }
