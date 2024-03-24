import { NotionContactUsOptions, NotionPage } from './types/contactUs'

interface NotionServiceInterface {
	sendMessageToNotionContactUs: (data: NotionContactUsOptions) => Promise<NotionPage>
}

export { NotionServiceInterface }
