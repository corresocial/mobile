import { ReportedTarget } from '../types'

export type ContactUsType = 'erro' | 'denúncia' | 'melhoria' | 'outro'

export type ContactUsOptions = {
	userId: string
	userName: string
	type: ContactUsType
	message: string
	reportId: string,
	reportedTarget?: ReportedTarget,
	reportedId?: string
}
