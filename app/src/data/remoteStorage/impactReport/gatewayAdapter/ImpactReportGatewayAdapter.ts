import { createNewReport } from '../createNewReport'
import { ImpactReportAdapterInterface } from './ImpactReportGatewayAdapterInterface'

function ImpactReportGatewayAdapter(): ImpactReportAdapterInterface {
	return {
		createNewReport
	}
}

export { ImpactReportGatewayAdapter }
