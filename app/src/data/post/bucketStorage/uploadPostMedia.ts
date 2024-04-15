import { uploadMedia } from './common'

type FolderType = 'pictures' | 'videos'

async function uploadPostMedia(mediaUri: string[], folder: FolderType) { // TODO Tipar folder
	return uploadMedia(mediaUri, 'posts', folder)
}

export { uploadPostMedia }
