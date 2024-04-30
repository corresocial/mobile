import { deleteObject, getMetadata, ref } from 'firebase/storage'

import { storage } from '@infrastructure/firebase/index'

async function deletePostMedias(postMedias: string[], storagePath: 'pictures' | 'videos') {
	try {
		postMedias.map(async (mediaUrl: string) => {
			const startIndex = mediaUrl.indexOf('posts%2F') + 8
			const endIndex = mediaUrl.indexOf('?alt')
			const mediaPath = `${storagePath}/posts/${mediaUrl.substring(startIndex, endIndex)}`

			const mediaStorageRef = ref(storage, mediaPath)
			const fileExists = await getMetadata(mediaStorageRef)

			if (!fileExists) {
				console.log(`File not found: ${mediaPath}`)
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
