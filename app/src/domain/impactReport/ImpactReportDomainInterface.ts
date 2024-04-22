import { Id } from '@domain/globalTypes'
import { ReportContext } from '@domain/impactReport/entity/types'

import { ImpactReportRepositoryInterface } from '@data/impactReport/ImpactReportRepositoryInterface'

interface ImpactReportDomainInterface {
	sendImpactReport(useImpactReportRepository: () => ImpactReportRepositoryInterface, usersIdInvolved: Id[], impactValue: number, reportContext?: ReportContext): Promise<boolean>
}

export { ImpactReportDomainInterface }
