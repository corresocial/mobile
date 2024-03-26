import { Id } from '@domain/globalTypes'
import { ReportContext } from '@domain/impactReport/entity/types'

import { useImpactReportRepository } from '@data/impactReport/useImpactReportRepository'

async function sendImpactReportDM(
	usersIdInvolved: Id[],
	hadImpact: boolean,
	impactValue: number,
	reportContext?: ReportContext
) {
	const { remoteStorage } = useImpactReportRepository()

	return remoteStorage.createNewReport({
		dateTime: new Date(),
		reportContext: reportContext || 'chat',
		hadImpact, // REFACTOR essa propriedade é necessária?
		impactValue,
		usersIdInvolved: usersIdInvolved || []
	})
}

export { sendImpactReportDM }
