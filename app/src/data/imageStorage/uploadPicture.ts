import { ref, uploadBytesResumable } from 'firebase/storage'

import { POST_COLLECTION, USER_COLLECTION } from '@data/remoteStorageKeys'

import { storage } from '@infrastructure/firebase/index'

type CollectionUpload = typeof USER_COLLECTION | typeof POST_COLLECTION

// Definir um nome melhor para o encapsulamento
async function uploadImage( // REFACTOR Colocar em uma interface
	localPath: string,
	collection: CollectionUpload
) {
	try {
		const response = await fetch(localPath)
		const blob = await response.blob()

		const fileRef = ref(
			storage,
			`pictures/${collection}/${Date.now()}}.jpg`,
		)

		const uploadTask = uploadBytesResumable(fileRef, blob)

		return { uploadTask, blob }
	} catch (error) {
		console.log(error)
	}
}

export { uploadImage }
