import { Id } from '@domain/entities/globalTypes'
import { ReportContext } from '@domain/entities/impactReport/types'

interface ImpactReportAdapterInterface {
	sendImpactReport(usersIdInvolved: Id[], hadImpact: boolean, impactValue: number, reportContext?: ReportContext): Promise<void>
}

export { ImpactReportAdapterInterface }
