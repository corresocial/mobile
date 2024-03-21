import { deleteUserData } from './remoteRepository/deleteUserData'
import { deleteUserProfilePicture } from './remoteRepository/deleteUserProfilePicture'
import { getPrivateContacts } from './remoteRepository/getPrivateContacts'
import { getPrivateLocation } from './remoteRepository/getPrivateLocation'
import { getUserData } from './remoteRepository/getUserData'
import { updatePrivateContacts } from './remoteRepository/updatePrivateContacts'
import { updatePrivateLocation } from './remoteRepository/updatePrivateLocation'
import { updateUserData } from './remoteRepository/updateUserData'
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
			// O usuário é criado chamando a função de UPDATE, o Firestore identifica
			// que não há um documento criado com o ID e cria um usuário se não existir.

			// PUT
			updateUserData: updateUserData,
			updatePrivateContacts: updatePrivateContacts,
			updatePrivateLocation: updatePrivateLocation,

			// DELETE
			deleteUserData: deleteUserData,
			deleteUserProfilePicture: deleteUserProfilePicture
		}
	}
}

export { useUserRepository }
