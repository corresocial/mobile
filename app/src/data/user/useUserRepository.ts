import { clearLocalUserData } from './localRepository/deleteLocalUser'
import { getLocalUserData } from './localRepository/getLocalUserData'
import { hasValidLocalUser } from './localRepository/hasValidLocalUser'
import { saveLocalUserData } from './localRepository/saveLocalUserData'
import { deleteUserData } from './remoteRepository/deleteUserData'
import { deleteUserProfilePicture } from './remoteRepository/deleteUserProfilePicture'
import { getPrivateContacts } from './remoteRepository/getPrivateContacts'
import { getPrivateLocation } from './remoteRepository/getPrivateLocation'
import { getUnapprovedProfiles } from './remoteRepository/getUnapprovedProfiles'
import { getUserData } from './remoteRepository/getUserData'
import { saveUserData } from './remoteRepository/saveUserData'
import { updatePrivateContacts } from './remoteRepository/updatePrivateContacts'
import { updatePrivateLocation } from './remoteRepository/updatePrivateLocation'
import { updateUserData } from './remoteRepository/updateUserData'
import { uploadUserMedia } from './remoteRepository/uploadUserMedia'
import { userExists } from './remoteRepository/userExists'
import { UserRepositoryInterface } from './UserRepositoryInterface'

function useUserRepository(): UserRepositoryInterface {
	return {
		localStorage: {
			getLocalUserData: getLocalUserData,
			saveLocalUserData: saveLocalUserData,
			clearLocalUserData: clearLocalUserData,
			hasValidLocalUser: hasValidLocalUser
		},

		remoteStorage: {
			// GET
			getUserData: getUserData,
			getPrivateContacts: getPrivateContacts,
			getPrivateLocation: getPrivateLocation,
			getUnapprovedProfiles: getUnapprovedProfiles,

			userExists: userExists,

			// POST
			saveUserData: saveUserData,

			// PUT
			updateUserData: updateUserData,
			updatePrivateContacts: updatePrivateContacts,
			updatePrivateLocation: updatePrivateLocation,

			// DELETE
			deleteUserData: deleteUserData,
			deleteUserProfilePicture: deleteUserProfilePicture,

			// UPLOAD
			uploadUserMedia: uploadUserMedia
		}
	}
}

export { useUserRepository }
