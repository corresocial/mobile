import { ImpactReport } from '@domain/impactReport/entity/types'

interface ImpactReportRepositoryInterface {
	localStorage: {

	},
	remoteStorage: {
		createNewReport(impactReportData: ImpactReport): Promise<boolean>
	}
}

export { ImpactReportRepositoryInterface }
