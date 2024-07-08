import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

import { PETITION_COLLECTION, POST_COLLECTION, USER_COLLECTION } from '@data/shared/storageKeys/remoteStorageKeys'

import { storage } from '@infrastructure/firebase'

type UploadPath = typeof USER_COLLECTION | typeof POST_COLLECTION | typeof PETITION_COLLECTION

async function uploadMedia(mediaUri: string[], uploadPath: UploadPath, folder: string) {
	const mediaUrl = mediaUri.map((url) => processUpload(url, uploadPath, folder))
	return Promise.all(mediaUrl)
}

async function processUpload(mediaUrl: string, uploadPath: UploadPath, folder: string) {
	try {
		const { uploadTask, blob }: any = await configUploadObjects(mediaUrl || '', uploadPath, folder)
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

		const fileExtention = 'jpg' // localPath.split('.')[localPath.split('.').length - 1]

		const fileRef = ref(
			storage,
			`${folder}/${path}/${Date.now()}.${fileExtention}`,
		)

		const uploadTask = uploadBytesResumable(fileRef, blob)

		return { uploadTask, blob }
	} catch (error) {
		console.log('Erro de path')
		console.log(error)
	}
}

export { uploadMedia }
