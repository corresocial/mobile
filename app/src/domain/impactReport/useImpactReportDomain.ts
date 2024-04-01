import { sendImpactReportDM } from '@domain/impactReport/methods/sendImpactReportDM'

import { ImpactReportDomainInterface } from './ImpactReportDomainInterface'

function useImpactReportDomain(): ImpactReportDomainInterface {
	return {
		sendImpactReport: sendImpactReportDM
	}
}

export { useImpactReportDomain }
