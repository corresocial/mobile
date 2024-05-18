import { uploadMedia } from '@data/shared/firebaseBucket'

export type StorageFolder = 'pictures'

async function uploadPetitionMedia(mediaUri: string[], folder: StorageFolder) {
	return uploadMedia(mediaUri, 'petitions', folder)
}

export { uploadPetitionMedia }
