import { Id } from '@domain/entities/globalTypes'

interface ImpactReportAdapterInterface {
	sendImpactReport(usersIdInvolved: Id[], hadImpact: boolean, reportMessage: string): Promise<void>
}

export { ImpactReportAdapterInterface }
