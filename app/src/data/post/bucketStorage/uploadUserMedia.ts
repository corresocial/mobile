import { uploadMedia } from './common'

async function uploadUserMedia(mediaUri: string[], folder: string) { // TODO Tipar folder
	return uploadMedia(mediaUri, 'posts', folder)
}

export { uploadUserMedia }
