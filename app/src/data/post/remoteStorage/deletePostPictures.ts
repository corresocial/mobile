import { deleteObject, getMetadata, ref } from 'firebase/storage'

import { storage } from '@infrastructure/firebase/index'

async function deletePostPictures(postPictures: string[]) {
	try {
		postPictures.map(async (pictureUrl: string) => {
			const startIndex = pictureUrl.indexOf('posts%2F') + 8
			const endIndex = pictureUrl.indexOf('?alt')
			const picturePath = `pictures/posts/${pictureUrl.substring(startIndex, endIndex)}`

			const pictureStorageRef = ref(storage, picturePath)
			const fileExists = await getMetadata(pictureStorageRef)

			if (!fileExists) {
				console.log(`File not found: ${picturePath}`)
				return true
			}

			await deleteObject(pictureStorageRef)
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deletePostPictures }
