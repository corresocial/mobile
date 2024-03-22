import { Id } from '@domain/entities/globalTypes'
import { ReportContext } from '@domain/entities/impactReport/types'

import { ImpactReportGatewayAdapter } from '@data/impactReport/gatewayAdapter/ImpactReportGatewayAdapter'

async function sendImpactReportUC(usersIdInvolved: Id[], hadImpact: boolean, impactValue: number, reportContext?: ReportContext) {
	const { createNewReport } = ImpactReportGatewayAdapter()

	return createNewReport({
		dateTime: new Date(),
		reportContext: reportContext || 'chat',
		hadImpact,
		impactValue,
		usersIdInvolved: usersIdInvolved || []
	})
}

export { sendImpactReportUC }
