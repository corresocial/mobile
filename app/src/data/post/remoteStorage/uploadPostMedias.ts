import { uploadMedia } from '@data/shared/firebaseBucket'

export type StorageFolder = 'pictures' | 'videos'

async function uploadPostMedias(mediaUri: string[], folder: StorageFolder) {
	return uploadMedia(mediaUri, 'posts', folder)
}

export { uploadPostMedias }
