import { Id } from '@domain/globalTypes'
import { ReportContext } from '@domain/impactReport/entity/types'

interface ImpactReportAdapterInterface {
	sendImpactReport(usersIdInvolved: Id[], hadImpact: boolean, impactValue: number, reportContext?: ReportContext): Promise<boolean>
}

export { ImpactReportAdapterInterface }
