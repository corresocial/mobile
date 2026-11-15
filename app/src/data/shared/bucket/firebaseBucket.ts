import { getDownloadURL, putFile, ref } from '@react-native-firebase/storage'
import uuid from 'react-uuid'

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
						const downloadURL = await getDownloadURL(fileRef)
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

		// uploadMedia prepara todos os arquivos no mesmo tick, então só o Date.now() repetia o nome e um arquivo sobrescrevia o outro
		const storageFilePath = `${folder}/${path}/${Date.now()}-${uuid()}.${fileExtention}`

		const fileRef = ref(firebaseStorage, storageFilePath)
		const task = putFile(fileRef, localPath)

		return { task, fileRef } as UploadObjects
	} catch (error) {
		console.log('Erro de path')
		console.log(error)
	}
}

export { uploadMedia }
