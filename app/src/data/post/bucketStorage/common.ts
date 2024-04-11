import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { POST_COLLECTION, USER_COLLECTION } from '@data/remoteStorageKeys'

import { storage } from '@infrastructure/firebase'

type UploadPath = typeof USER_COLLECTION | typeof POST_COLLECTION

async function uploadMedia(postPictures: string[], uploadPath: UploadPath, folder: string) {
	const postPicturesUrl = postPictures.map((pictureUrl, index) => processUpload(pictureUrl, uploadPath, folder))
	return Promise.all(postPicturesUrl)
}

async function processUpload(pictureUrl: string, uploadPath: UploadPath, folder: string) {
	try {
		const { uploadTask, blob }: any = await configUploadObjects(pictureUrl || '', uploadPath, folder)
		return new Promise<string>((resolve, reject) => {
			uploadTask.on(
				'state_change',
				() => { },
				(err: any) => {
					blob.close()
					reject(err)
				},
				async () => {
					try {
						const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
						blob.close()
						resolve(downloadURL)
					} catch (error) {
						reject(error)
					}
				},
			)
		})
	} catch (error: any) {
		throw new Error(error)
	}
}

export async function configUploadObjects(localPath: string, path: UploadPath, folder: string) {
	try {
		const response = await fetch(localPath)
		const blob = await response.blob()

		const fileRef = ref(
			storage,
			`${folder}/${path}/${Date.now()}.jpg`,
		)

		const uploadTask = uploadBytesResumable(fileRef, blob)

		return { uploadTask, blob }
	} catch (error) {
		console.log(error)
	}
}

export { uploadMedia }
