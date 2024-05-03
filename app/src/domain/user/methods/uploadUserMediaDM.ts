import { StorageFolder } from '@data/user/remoteRepository/uploadUserMedia'
import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

function uploadUserMediaDM(useUserRepository: () => UserRepositoryInterface, mediaUri: string[], folder: StorageFolder) {
	const { remoteStorage } = useUserRepository()
	return remoteStorage.uploadUserMedia(mediaUri, folder)
}

export { uploadUserMediaDM }
