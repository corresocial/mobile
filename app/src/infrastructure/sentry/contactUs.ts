import * as Sentry from '@sentry/react-native'

interface ContactUsToSentryOptions {
	userId: string
	userName?: string
	type: string
	message: string
	reportId: string
	reportedTarget?: string
	reportedId?: string
}

/**
 * Registra o "Fale conosco" / erro / denúncia como feedback no Sentry (aparece no painel e dispara o alerta por e-mail).
 * Nunca lança erro: o envio ao Sentry não pode impedir o usuário de concluir o fluxo.
 */
function sendContactUsToSentry({ userId, userName, type, message, reportId, reportedTarget, reportedId }: ContactUsToSentryOptions) {
	try {
		return Sentry.withScope((scope) => {
			scope.setUser({ id: userId })
			scope.setTag('contactUsType', type)
			scope.setTag('reportedTarget', reportedTarget || 'none')
			scope.setExtra('reportId', reportId)
			scope.setExtra('reportedId', reportedId || null)

			const eventId = Sentry.captureFeedback({
				message: message.length > 2000 ? `${message.substring(0, 1950)}...` : message,
				name: userName || undefined,
				source: 'fale-conosco'
			}, {}, scope)
			return !!eventId
		})
	} catch (error) {
		console.log('[sentry]: não foi possível enviar o fale conosco', error)
		return false
	}
}

export { sendContactUsToSentry }
