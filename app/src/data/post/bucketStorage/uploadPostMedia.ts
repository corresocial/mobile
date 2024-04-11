import { uploadMedia } from './common'

async function uploadPostMedia(mediaUri: string[], folder: string) { // TODO Tipar folder
	return uploadMedia(mediaUri, 'posts', folder)
}

export { uploadPostMedia }
