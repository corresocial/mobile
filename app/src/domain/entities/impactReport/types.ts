import { Id } from '../globalTypes'

interface ImpactReport {
	dateTime: Date
	hadImpact: boolean
	reportMessage: string
	usersIdInvolved: Id[]
}

export { ImpactReport }
