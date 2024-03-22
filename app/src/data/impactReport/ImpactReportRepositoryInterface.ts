import { ImpactReport } from '@domain/entities/impactReport/types'

interface ImpactReportRepositoryInterface {
	createNewReport(impactReportData: ImpactReport): Promise<boolean>
}

export { ImpactReportRepositoryInterface }
