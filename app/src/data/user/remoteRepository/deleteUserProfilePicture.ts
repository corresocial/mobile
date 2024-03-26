import { deleteObject, getMetadata, ref } from 'firebase/storage'

import { storage } from '@infrastructure/firebase/index'

async function deleteUserProfilePicture(profilePictures: string[]) {
	try {
		profilePictures.map(async (pictureUrl: string) => {
			const startIndex = pictureUrl.indexOf('users%2F') + 8 // REFACTOR Tratativas muito instáveis
			const endIndex = pictureUrl.indexOf('?alt')
			const picturePath = `pictures/users/${pictureUrl.substring(startIndex, endIndex)}`

			const pictureStorageRef = ref(storage, picturePath)
			const fileExists = await getMetadata(pictureStorageRef)

			if (!fileExists) {
				console.log(`File not found: ${picturePath}`)
				return true
			}

			return deleteObject(pictureStorageRef)
				.then(() => true)
				.catch((err) => {
					console.log(`error: ${picturePath}`)
					console.log(err)
					return false
				})
		})

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deleteUserProfilePicture }
