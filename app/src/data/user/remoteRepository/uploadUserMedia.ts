import { uploadMedia } from '@data/bucketStorage/common'

async function uploadUserMedia(mediaUri: string[], folder: string) { // TODO Tipar folder
	return uploadMedia(mediaUri, 'users', folder)
}

export { uploadUserMedia }
