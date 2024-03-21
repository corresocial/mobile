import { ref, uploadBytesResumable } from 'firebase/storage'

import { storage } from '@services/firebase'

type CollectionUpload = 'users' | 'posts'

async function uploadImage(
	localPath: string,
	collection: CollectionUpload,
	index?: number
) {
	try {
		const response = await fetch(localPath)
		const blob = await response.blob()

		const fileRef = ref(
			storage,
			`pictures/${collection}/${Date.now()}-${index || ''}.jpg`,
		)

		const uploadTask = uploadBytesResumable(fileRef, blob)

		return { uploadTask, blob }
	} catch (error) {
		console.log(error)
	}
}

export { uploadImage }
