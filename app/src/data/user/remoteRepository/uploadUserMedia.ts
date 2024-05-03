import { uploadMedia } from '@data/shared/firebaseBucket'

export type StorageFolder = 'pictures'

async function uploadUserMedia(mediaUri: string[], folder: StorageFolder) {
	return uploadMedia(mediaUri, 'users', folder)
}

export { uploadUserMedia }
