import { uploadMedia } from '@data/bucketStorage/common'

export type StorageFolder = 'pictures'

async function uploadUserMedia(mediaUri: string[], folder: StorageFolder) { // TODO Tipar folder
	return uploadMedia(mediaUri, 'users', folder)
}

export { uploadUserMedia }
