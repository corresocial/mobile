import { NotionContactUsOptions } from './types/contactUs'

interface NotionServiceInterface {
	sendMessageToNotionContactUs: (data: NotionContactUsOptions) => Promise<boolean>
}

export { NotionServiceInterface }
