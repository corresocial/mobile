import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

import { storage } from '@services/firebase'

type CollectionUpload = 'users' | 'posts'

async function uploadImageAndGetUrl(
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

		const snapshot = await uploadBytes(fileRef, blob)
		const url = getDownloadURL(snapshot.ref)
		return url
	} catch (err) {
		console.log(err)
	}
}

export { uploadImageAndGetUrl }
