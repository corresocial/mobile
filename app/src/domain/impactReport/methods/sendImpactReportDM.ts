import { Id } from '@domain/globalTypes'
import { ReportContext } from '@domain/impactReport/entity/types'

import { ImpactReportRepositoryInterface } from '@data/impactReport/ImpactReportRepositoryInterface'

async function sendImpactReportDM(
	useImpactReportRepository: () => ImpactReportRepositoryInterface,
	usersIdInvolved: Id[],
	impactValue: number,
	reportContext?: ReportContext
) {
	const { remoteStorage } = useImpactReportRepository()

	return remoteStorage.createNewReport({
		dateTime: new Date(),
		reportContext: reportContext || 'chat',
		hadImpact: true,
		impactValue,
		usersIdInvolved: usersIdInvolved || []
	})
}

export { sendImpactReportDM }
