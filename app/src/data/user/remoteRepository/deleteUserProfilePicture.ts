import { deleteObject, getMetadata, ref } from 'firebase/storage'

import { storage } from '@services/firebase'

const deleteUserProfilePicture = async (pictures: string[]) => {
	try {
		const result = pictures.map(async (pictureUrl: string) => {
			const startIndex = pictureUrl.indexOf('users%2F') + 8 // REFACTOR Tratativas muito instáveis
			const endIndex = pictureUrl.indexOf('?alt')
			const picturePath = `pictures/users/${pictureUrl.substring(startIndex, endIndex)}`

			const desertRef = ref(storage, picturePath)
			const fileExists = await getMetadata(desertRef)

			if (!fileExists) {
				console.log(`File not found: ${picturePath}`)
				return true
			}

			const success = await deleteObject(desertRef)
				.then(() => {
					return true
				}).catch((err) => {
					console.log(`error: ${picturePath}`)
					console.log(err)
					return false
				})

			return success
		})

		return result
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deleteUserProfilePicture }
