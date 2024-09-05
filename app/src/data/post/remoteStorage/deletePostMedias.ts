import { firebaseStorage } from '@infrastructure/firebase/index'

import { StorageFolder } from './uploadPostMedias'

async function deletePostMedias(postMedias: string[], storagePath: StorageFolder) {
	try {
		postMedias.map(async (mediaUrl: string) => {
			const startIndex = mediaUrl.indexOf('posts%2F') + 8
			const endIndex = mediaUrl.indexOf('?alt')
			const mediaPath = `${storagePath}/posts/${mediaUrl.substring(startIndex, endIndex)}`

			const mediaStorageRef = firebaseStorage.ref(mediaPath)
			const fileExists = await mediaStorageRef.getMetadata()

			if (!fileExists) {
				console.log(`Arquivo não encontrado: ${mediaPath}`)
				return true
			}

			await mediaStorageRef.delete()
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deletePostMedias }
