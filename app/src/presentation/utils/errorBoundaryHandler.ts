// eslint-disable-next-line import/no-unresolved

import { useNotionService } from '@services/notion/useNotionService'
import { sendMessageToDiscordContactUs } from '@services/discord/methods/contactUs'

const { sendMessageToNotionContactUs } = useNotionService()

// infra/service
export const errorBoundaryHandler = async (error: unknown, stackTrace: any) => {
	const currentError = error instanceof Error ? error : new Error(String(error))
	console.log(error)
	console.log(stackTrace)

	// eslint-disable-next-line no-undef
	if (__DEV__) {
		return
	}

	const errorLocationRegexResult = stackTrace.match(/in (([a-zA-Z]+\s+)+)\(created by (([a-zA-Z]+)+)\)/i) || []
	const errorLocation = errorLocationRegexResult.length ? errorLocationRegexResult[0] : 'não definido'

	const { reportId } = await sendMessageToNotionContactUs({
		userId: 'anonymous',
		type: 'erro',
		title: currentError.message,
		message: stackTrace.toString(),
	})

	await sendMessageToDiscordContactUs({
		userId: 'anonymous',
		userName: 'anonymous',
		type: 'erro',
		reportId: reportId || 'unknown',
		message: `
Tipo de erro: ${currentError.name}
Erro: ${currentError.message}
Local do erro: ${errorLocation}
ID da stackTrace: ${reportId}
		`,
	})
}
