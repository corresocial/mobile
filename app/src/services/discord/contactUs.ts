import { FALECONOSCO_WEBHOOK, ERROS_WEBHOOK, DENUNCIAR_WEBHOOK } from '@env'
import { ContactUsOptions } from './types'

async function sendContactUsMessageToDiscord({
	userId,
	userName,
	type,
	message,
	reportId,
}: ContactUsOptions) {
	const getShortMessage = () => {
		if (message.length > 1000) {
			return `${message.substring(0, 1000)}...`
		}
		return message
	}

	const getRelativeWebHook = () => {
		switch (type) {
			case 'erro': return ERROS_WEBHOOK
			case 'denúncia': return DENUNCIAR_WEBHOOK
			default: return FALECONOSCO_WEBHOOK
		}
	}

	const getRelativeTitle = () => {
		switch (type) {
			case 'erro': return 'BUG'
			case 'denúncia': return 'DENUNCIA'
			default: return 'FALE CONOSCO'
		}
	}

	const shortMessage = getShortMessage()

	const content = `
    ${getRelativeTitle()}:
    Categoria: ${type}
    Usuário: ${userName}
    ID do usuário: ${userId}
    Mensagem: ${shortMessage}
	ReportID: ${reportId}`
	const response = await fetch(
		`${getRelativeWebHook()}?${new URLSearchParams({ wait: true } as any)}`, // TODO Type
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content, wait: true }),
		},
	)
		.catch((err) => {
			console.log(err)
			throw new Error(err)
		})
	return response
}

export { sendContactUsMessageToDiscord }
