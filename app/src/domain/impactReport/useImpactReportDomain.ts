import { sendImpactReportUC } from '@domain/impactReport/methods/sendImpactReportUC'

import { ImpactReportDomainInterface } from './ImpactReportDomainInterface'

function useImpactReportDomain(): ImpactReportDomainInterface {
	return {
		sendImpactReport: sendImpactReportUC
	}
}

export { useImpactReportDomain }
