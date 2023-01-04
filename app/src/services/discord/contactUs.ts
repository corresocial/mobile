import { FALECONOSCO_WEBHOOK } from '@env'
import { ContactUsOptions } from './types'

async function sendContactUsMessage({
	userId,
	userName,
	title,
	message,
}: ContactUsOptions) {
	const content = `
    FALE CONOSCO:
    Categoria: ${title}
    Mensagem: ${message}
    Usuário: ${userName}
    ID do usuário: ${userId}`
	const response = await fetch(
		`${FALECONOSCO_WEBHOOK}?${new URLSearchParams({ wait: true } as any)}`, // TODO Type
		{
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ content, wait: true }),
		},
	)
	return response
}

export { sendContactUsMessage }
