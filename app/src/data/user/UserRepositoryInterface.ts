import { PrivateUserCollection, UserCollection } from '@services/firebase/types'

interface UserRepositoryInterface {
	localUser: {
		getLocalUserData: () => Promise<UserCollection | null>
		saveLocalUserData: (data: UserCollection) => Promise<boolean>
		clearLocalUserData: () => Promise<boolean>
	}

	remoteUser: {
		// GET
		getUserData: (userId: string) => Promise<UserCollection | null>
		getPrivateContacts: (userId: string) => Promise<PrivateUserCollection['contacts'] | null>
		getPrivateLocation: (userId: string) => Promise<PrivateUserCollection['location'] | null>

		userExists: (userId: string) => Promise<boolean>
		// POST

		// UPDATE
		updateUserData: (userId: string, data: UserCollection) => Promise<boolean>
		updatePrivateContacts: (userId: string, data: PrivateUserCollection['contacts']) => Promise<boolean>
		updatePrivateLocation: (userId: string, data: PrivateUserCollection['location']) => Promise<boolean>

		// DELETE
		deleteUserData: (userId: string) => Promise<boolean>
		deleteUserProfilePicture: (profilePictures: string[]) => Promise<boolean>
	}
}

export { UserRepositoryInterface }
