import { deleteObject, getMetadata, ref } from '@react-native-firebase/storage'

import { firebaseStorage } from '@infrastructure/firebase/index'

import { StorageFolder } from './uploadPostMedias'

async function deletePostMedias(postMedias: string[], storagePath: StorageFolder) {
	try {
		postMedias.map(async (mediaUrl: string) => {
			const startIndex = mediaUrl.indexOf('posts%2F') + 8
			const endIndex = mediaUrl.indexOf('?alt')
			const mediaPath = `${storagePath}/posts/${mediaUrl.substring(startIndex, endIndex)}`

			const mediaStorageRef = ref(firebaseStorage, mediaPath)
			const fileExists = await getMetadata(mediaStorageRef)

			if (!fileExists) {
				console.log(`Arquivo não encontrado: ${mediaPath}`)
				return true
			}

			await deleteObject(mediaStorageRef)
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deletePostMedias }
