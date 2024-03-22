import { ImpactReportRepositoryInterface } from './ImpactReportRepositoryInterface'
import { createNewReport } from './remoteRepository/createNewReport'

function useImpactReportRepository(): ImpactReportRepositoryInterface {
	return {
		createNewReport: createNewReport
	}
}

export { useImpactReportRepository }
