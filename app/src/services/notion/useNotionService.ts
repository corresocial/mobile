import { sendMessageToNotionContactUs } from './methods/sendContactUsMessage'

function useNotionService() {
	return {
		sendMessageToNotionContactUs: sendMessageToNotionContactUs
	}
}

export { useNotionService }
