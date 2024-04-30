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
		/* Sentry.captureException(error, { // REFACTOR
			extra: {
				message: 'Error updating user repository',
				userId: currentUserData.userId,
				userData: newUserData,
			},
		});

		// Re-throw the error to allow it to propagate
		throw error */
	}
}

export { updateUserRepositoryDM }
