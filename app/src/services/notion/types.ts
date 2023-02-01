import { ReportedTarget } from '../types'

export type ContactUsType = 'erro' | 'denúncia' | 'melhoria' | 'outro'

export type ContactUsOptions = {
	userId: string
	type: ContactUsType
	title?: string
	message: string
	reportTarged?: ReportedTarget
	reportedId?: string
}

export type NotionPage = {
	id: string
	object: 'page'
	reportId: string
}
