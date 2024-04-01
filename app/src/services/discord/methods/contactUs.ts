import { DiscordContactUsOptions } from '../types/contactUs'

import { getEnvVars } from '@infrastructure/environment'

const { FALECONOSCO_WEBHOOK, ERROS_WEBHOOK, DENUNCIAR_WEBHOOK } = getEnvVars()

async function sendMessageToDiscordContactUs({
	userId,
	type,
	message,
	reportId,
	reportedTarget,
	reportedId
}: DiscordContactUsOptions) {
	try {
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

		const getRelativeReportedTarget = () => {
			switch (reportedTarget) {
				case 'income': return 'renda'
				case 'socialImpact': return 'impacto social'
				case 'culture': return 'cultura'
				case 'user': return 'usuário'
				default: return '---'
			}
		}

		const shortMessage = getShortMessage()
		const content = `
		${getRelativeTitle()}:
		Categoria: ${type}
		Protocolo: ${reportId}
		ID do remetente: ${userId}
		Entidade Reportada: ${getRelativeReportedTarget()}
		ID da entidade: ${reportedId || '---'}
		Mensagem: ${shortMessage}`

		await fetch(
			`${getRelativeWebHook()}?${new URLSearchParams({ wait: true } as any)}`,
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
		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { sendMessageToDiscordContactUs }
