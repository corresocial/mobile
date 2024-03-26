import { Id } from '../../globalTypes'

export type ReportContext = 'income' | 'culture' | 'socialImpact' | 'chat'

interface ImpactReport {
	dateTime: Date
	reportContext: ReportContext
	hadImpact: boolean
	impactValue: number,
	usersIdInvolved: Id[]
}

export { ImpactReport }
