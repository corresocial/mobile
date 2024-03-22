import { ImpactReportRepositoryInterface } from './ImpactReportRepositoryInterface'
import { createNewReport } from './remoteRepository/createNewReport'

function useImpactReportRepository(): ImpactReportRepositoryInterface {
	return {
		localStorage: {

		},
		remoteStorage: {
			createNewReport: createNewReport
		}
	}
}

export { useImpactReportRepository }
