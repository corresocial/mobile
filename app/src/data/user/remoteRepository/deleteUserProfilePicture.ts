import { deleteObject, getMetadata, ref } from '@react-native-firebase/storage'

import { firebaseStorage } from '@infrastructure/firebase'

async function deleteUserProfilePicture(profilePictures: string[]) {
	try { // REFACTOR Melhorar busca de assets name
		await Promise.all(profilePictures.map(async (pictureUrl: string) => {
			const startIndex = pictureUrl.indexOf('users%2F') + 8
			const endIndex = pictureUrl.indexOf('?alt')
			const picturePath = `pictures/users/${pictureUrl.substring(startIndex, endIndex)}`

			try {
				const pictureStorageRef = ref(firebaseStorage, picturePath)
				await getMetadata(pictureStorageRef)
				await deleteObject(pictureStorageRef)
			} catch (error: any) {
				if (error?.code === 'storage/object-not-found') {
					console.log(`File not found: ${pictureUrl}`)
					return
				}
				throw error
			}
		}))

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { deleteUserProfilePicture }
