import { ImpactReport } from '@domain/entities/impactReport/types'

interface ImpactReportRepositoryInterface {
	localStorage: {

	},
	remoteStorage: {
		createNewReport(impactReportData: ImpactReport): Promise<boolean>
	}
}

export { ImpactReportRepositoryInterface }
