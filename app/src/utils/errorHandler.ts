// eslint-disable-next-line import/no-unresolved
import { ERROS_WEBHOOK } from '@env'
import { sendContactUsMessageToNotion } from '../services/notion/contactUs'

export const errorHandler = async (error: Error, stackTrace: any) => {
	console.log(error)
	console.log(stackTrace)

	const errorLocationRegexResult = stackTrace.match(/in (([a-zA-Z]+\s+)+)\(created by (([a-zA-Z]+)+)\)/i) || []
	const errorLocation = errorLocationRegexResult.length ? errorLocationRegexResult[0] : 'undefined'

	const { reportId } = await sendContactUsMessageToNotion({
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
