import { sendImpactReportUC } from '@domain/impactReport/methods/sendImpactReportUC'

import { ImpactReportAdapterInterface } from './ImpactReportAdapterInterface'

function ImpactReportAdapter(): ImpactReportAdapterInterface {
	return {
		sendImpactReport: sendImpactReportUC
	}
}

export { ImpactReportAdapter }
