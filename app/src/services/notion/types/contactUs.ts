import { ReportedTarget } from '../../types'

type NotionContactUsType = 'erro' | 'denúncia' | 'melhoria' | 'outro'

export type NotionContactUsOptions = {
	userId: string
	type: NotionContactUsType
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
