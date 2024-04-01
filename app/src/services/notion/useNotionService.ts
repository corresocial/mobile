import { sendMessageToNotionContactUs } from './methods/sendContactUsMessage'
import { NotionServiceInterface } from './NotionServiceInterface'

function useNotionService(): NotionServiceInterface {
	return {
		sendMessageToNotionContactUs: sendMessageToNotionContactUs
	}
}

export { useNotionService }
