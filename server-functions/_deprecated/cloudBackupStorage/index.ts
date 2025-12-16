import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()

/* 
	gcloud functions deploy cloudBackupStorage \
		--runtime nodejs18 \
		--trigger-resource [bucketName] \
		--trigger-event google.storage.object.finalize \
		--region southamerica-east1 \
*/

// Configurar variáveis deambiente de acordo com as docs

exports.cloudBackupStorage = functions.storage.object().onFinalize(async (object) => {
	async function performBackup(filePath: string, file: any) {
		const backupBucket = admin.storage().bucket(process.env.BACKUP_BUCKET)
		await file.copy(backupBucket.file(filePath))
	}

	try {
		const filePath = object.name
		const bucket = admin.storage().bucket(object.bucket)
		const file = bucket.file(filePath as string || '')

		await performBackup(filePath || '', file)

		console.log(`[success] Backup realizado: ${filePath}`)
		return null
	} catch (err) {
		console.log(`[error] Erro ao realizar backup: ${object.name}`)
		console.log(err)
		return null
	}
})