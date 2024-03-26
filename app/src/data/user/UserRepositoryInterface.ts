import { PrivateUserEntity, UserEntity } from '@domain/user/entity/types'

interface UserRepositoryInterface {
	localStorage: {
		getLocalUserData: () => Promise<UserEntity | null>
		saveLocalUserData: (data: UserEntity) => Promise<boolean>
		clearLocalUserData: () => Promise<boolean>
	}

	remoteStorage: {
		// GET
		getUserData: (userId: string) => Promise<UserEntity | null>
		getPrivateContacts: (userId: string) => Promise<PrivateUserEntity['contacts'] | null>
		getPrivateLocation: (userId: string) => Promise<PrivateUserEntity['location'] | null>

		userExists: (userId: string) => Promise<boolean>
		// POST

		// UPDATE
		updateUserData: (userId: string, data: UserEntity) => Promise<boolean>
		updatePrivateContacts: (userId: string, data: PrivateUserEntity['contacts']) => Promise<boolean>
		updatePrivateLocation: (userId: string, data: PrivateUserEntity['location']) => Promise<boolean>

		// DELETE
		deleteUserData: (userId: string) => Promise<boolean>
		deleteUserProfilePicture: (profilePictures: string[]) => Promise<boolean>
	}
}

export { UserRepositoryInterface }
