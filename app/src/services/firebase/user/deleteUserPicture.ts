import { deleteObject, ref } from 'firebase/storage'
import { storage } from '..'

const deleteUserPicture = async (pictures: string[]) => {
	const result = pictures.map(async (pictureUrl: string) => {
		const startIndex = pictureUrl.indexOf('users%2F') + 8
		const endIndex = pictureUrl.indexOf('?alt')
		const picturePath = `pictures/users/${pictureUrl.substring(startIndex, endIndex)}`

		const desertRef = ref(storage, picturePath)

		const res = await deleteObject(desertRef)
			.then(() => {
				console.log(`deleted: ${picturePath}`)
				return true
			}).catch((err) => {
				console.log(`error: ${picturePath}`)
				console.log(err)
				return false
			})

		return res
	})

	return result
}

export { deleteUserPicture }
