import { ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '..'

async function uploadImage(
	localPath: string,
	collection: string,
	index?: number
) {
	try {
		const blob = await new Promise((resolve, reject) => {
			const xhr = new global.XMLHttpRequest()
			xhr.onload = () => {
				resolve(xhr.response)
			}
			xhr.onerror = (e) => {
				console.log(e)
				reject(new TypeError('Network request failed'))
			}
			xhr.responseType = 'blob'
			xhr.open('GET', localPath, true)
			xhr.send(null)
		})

		const fileRef = ref(
			storage,
			`pictures/${collection}/${Date.now()}-${index || ''}.jpg`,
		)

		const uploadTask = uploadBytesResumable(fileRef, blob as Uint8Array | ArrayBuffer)

		return {
			uploadTask, blob
		}
	} catch (e) {
		console.log(e)
	}
}

export { uploadImage }
