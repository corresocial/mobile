import { ReportedTarget } from '../../types'

export type DiscordContactUsType = 'erro' | 'denúncia' | 'melhoria' | 'outro'

export type DiscordContactUsOptions = {
	userId: string
	userName: string
	type: DiscordContactUsType
	message: string
	reportId: string,
	reportedTarget?: ReportedTarget,
	reportedId?: string
}
