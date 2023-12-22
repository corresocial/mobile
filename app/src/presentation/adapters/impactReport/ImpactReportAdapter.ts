import { sendImpactReportUC } from '@domain/impactReport/useCases/sendImpactReportUC'

import { ImpactReportAdapterInterface } from './ImpactReportAdapterInterface'

function ImpactReportAdapter(): ImpactReportAdapterInterface {
	return {
		sendImpactReport: sendImpactReportUC
	}
}

export { ImpactReportAdapter }
