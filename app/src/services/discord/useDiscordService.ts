import { DiscordServiceInterface } from './DiscordServiceInterface'
import { sendMessageToDiscordContactUs } from './methods/contactUs'

function useDiscordService(): DiscordServiceInterface {
	return {
		sendMessageToDiscordContactUs: sendMessageToDiscordContactUs
	}
}

export { useDiscordService }
