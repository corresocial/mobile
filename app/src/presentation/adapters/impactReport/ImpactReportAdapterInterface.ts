import { Id } from '@domain/entities/globalTypes'

interface ImpactReportAdapterInterface {
	sendImpactReport(usersIdInvolved: Id[], hadImpact: boolean, impactValue: number): Promise<void>
}

export { ImpactReportAdapterInterface }
