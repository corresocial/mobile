import { deleteUserData } from './remoteRepository/deleteUserData'
import { getPrivateContacts } from './remoteRepository/getPrivateContacts'
import { getPrivateLocation } from './remoteRepository/getPrivateLocation'
import { getUserData } from './remoteRepository/getUserData'
import { updatePrivateContacts } from './remoteRepository/updatePrivateContacts'
import { updatePrivateLocation } from './remoteRepository/updatePrivateLocation'
import { userExists } from './remoteRepository/userExists'
import { UserRepositoryInterface } from './UserRepositoryInterface'

function useUserRepository(): UserRepositoryInterface {
	return {
		localUser: {

		},
		remoteUser: {
			// GET
			getUserData: getUserData,
			getPrivateContacts: getPrivateContacts,
			getPrivateLocation: getPrivateLocation,
			userExists: userExists,

			// POST

			// PUT
			updatePrivateContacts: updatePrivateContacts,
			updatePrivateLocation: updatePrivateLocation,

			// DELTE
			deleteUserData: deleteUserData
		}
	}
}

export { useUserRepository }
