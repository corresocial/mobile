import { Id } from '@domain/entities/globalTypes'
import { ReportContext } from '@domain/entities/impactReport/types'

import { useImpactReportRepository } from '@data/impactReport/useImpactReportRepository'

async function sendImpactReportUC(usersIdInvolved: Id[], hadImpact: boolean, impactValue: number, reportContext?: ReportContext) {
	const { createNewReport } = useImpactReportRepository()

	return createNewReport({
		dateTime: new Date(),
		reportContext: reportContext || 'chat',
		hadImpact,
		impactValue,
		usersIdInvolved: usersIdInvolved || []
	})
}

export { sendImpactReportUC }
