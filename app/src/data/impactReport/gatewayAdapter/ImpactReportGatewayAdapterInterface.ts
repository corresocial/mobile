import { ImpactReport } from '@domain/entities/impactReport/types'

export interface ImpactReportAdapterInterface {
	createNewReport(impactReportData: ImpactReport): Promise<void>
}
