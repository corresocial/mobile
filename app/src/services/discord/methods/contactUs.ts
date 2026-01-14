import auth from '@react-native-firebase/auth'

import { DiscordContactUsOptions } from '../types/contactUs'

import { firebaseFunctions } from '@infrastructure/firebase'

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

		const { currentUser } = auth()
		if (!currentUser && type !== 'erro') throw new Error('Usuário não autenticado')

		const discordIntegration = firebaseFunctions.httpsCallable('discordIntegration')
		await discordIntegration({ content, type })

		return true
	} catch (error) {
		console.log(error)
		return false
	}
}

export { sendMessageToDiscordContactUs }
