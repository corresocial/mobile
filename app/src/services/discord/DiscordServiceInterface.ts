import { DiscordContactUsOptions } from './types/contactUs'

interface DiscordServiceInterface {
	sendMessageToDiscordContactUs: (data: DiscordContactUsOptions) => Promise<boolean>
}

export { DiscordServiceInterface }
