import { Id } from '@domain/entities/globalTypes'

import { ImpactReportGatewayAdapter } from '@data/remoteStorage/impactReport/gatewayAdapter/ImpactReportGatewayAdapter'

async function sendImpactReportUC(usersIdInvolved: Id[], hadImpact: boolean, reportMessage: string) {
	const { createNewReport } = ImpactReportGatewayAdapter()

	return createNewReport({
		dateTime: new Date(),
		hadImpact,
		reportMessage,
		usersIdInvolved: usersIdInvolved || []
	})
}

export { sendImpactReportUC }
