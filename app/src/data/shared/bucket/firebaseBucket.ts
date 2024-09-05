import { UploadObjects, UploadPath } from './types'

import { firebaseStorage } from '@infrastructure/firebase'

async function uploadMedia(mediaUri: string[], uploadPath: UploadPath, folder: string) {
	const mediaUrl = mediaUri.map((url) => processUpload(url, uploadPath, folder))
	return Promise.all(mediaUrl)
}

async function processUpload(mediaUrl: string, uploadPath: UploadPath, folder: string) {
	try {
		const { task, fileRef } = await configUploadObjects(mediaUrl || '', uploadPath, folder) as UploadObjects
		if (!task || !fileRef) throw new Error('Erro ao fazer upload, referência de arquivo inválida')

		return new Promise<string>((resolve, reject) => {
			task.on(
				'state_changed',
				() => { },
				(err: any) => {
					reject(err)
				},
				async () => {
					try {
						const downloadURL = await fileRef.getDownloadURL()
						console.log(downloadURL)
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
		const fileExtention = folder === 'pictures' ? 'jpg' : 'mp4'

		const storageFilePath = `${folder}/${path}/${Date.now()}.${fileExtention}`

		const fileRef = firebaseStorage.ref(storageFilePath)
		const task = fileRef.putFile(localPath)

		return { task, fileRef } as UploadObjects
	} catch (error) {
		console.log('Erro de path')
		console.log(error)
	}
}

export { uploadMedia }
