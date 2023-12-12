import { Id } from '@domain/entities/globalTypes'

import { ImpactReportGatewayAdapter } from '@data/remoteStorage/impactReport/gatewayAdapter/ImpactReportGatewayAdapter'

async function sendImpactReportUC(usersIdInvolved: Id[], hadImpact: boolean, impactValue: number) {
	const { createNewReport } = ImpactReportGatewayAdapter()

	return createNewReport({
		dateTime: new Date(),
		hadImpact,
		impactValue,
		usersIdInvolved: usersIdInvolved || []
	})
}

export { sendImpactReportUC }
