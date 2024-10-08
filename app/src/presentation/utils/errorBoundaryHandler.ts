// eslint-disable-next-line import/no-unresolved

import { useNotionService } from '@services/notion/useNotionService'

import { getEnvVars } from '../../infrastructure/environment'

const { ERROS_WEBHOOK } = getEnvVars()

const { sendMessageToNotionContactUs } = useNotionService()

// infra/service
export const errorBoundaryHandler = async (error: Error, stackTrace: any) => {
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
		title: error.message,
		message: stackTrace.toString(),
	})

	await fetch(ERROS_WEBHOOK, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			content: `
Tipo de erro: ${error.name}
Erro: ${error.message}
Local do erro: ${errorLocation}
ID da stackTrace: ${reportId}
		`,
		}),
	})
}
