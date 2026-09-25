import { NotionContactUsOptions, NotionPage } from '../types/contactUs'

import { firebaseFunctions } from '@infrastructure/firebase'

async function sendMessageToNotionContactUs({
	type,
	title,
	message,
	reportTarged,
	reportedId
}: NotionContactUsOptions) {
	try {
		// O remetente é identificado no servidor pelo token de autenticação
		const notionIntegration = firebaseFunctions.httpsCallable('notionIntegration')
		const response = await notionIntegration({
			type,
			title,
			message,
			reportedTarget: reportTarged,
			reportedId
		})

		return response.data as NotionPage
	} catch (error) {
		console.log(error)
		return { id: 'undefined', object: 'page', reportId: reportedId } as NotionPage
	}
}

export { sendMessageToNotionContactUs }
