type NotionContactUsType = 'erro' | 'denúncia' | 'melhoria' | 'outro'
export type ReportedTarget = 'none' | 'income' | 'culture' | 'socialImpact' | 'user' | 'poll' | 'petition'

export type NotionContactUsOptions = {
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
