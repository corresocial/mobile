import { Id } from '../globalTypes'

interface ImpactReport {
	dateTime: Date
	hadImpact: boolean
	impactValue: number,
	usersIdInvolved: Id[]
}

export { ImpactReport }
