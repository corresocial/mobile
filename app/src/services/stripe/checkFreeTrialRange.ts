import { isAfter, isBefore } from 'date-fns'

import { UserSubscription } from '@domain/user/entity/types'

export function checkFreeTrialRange(userPlanRange: UserSubscription['subscriptionRange']): { range: UserSubscription['subscriptionRange'], betweenRange: boolean } {
	const startDate = new Date('2024-08-15 00:00:00') // CURRENT Mudar data
	const endDate = new Date('2024-11-15 00:00:00')

	const currentDate = new Date()
	if (isAfter(currentDate, startDate) && (isBefore(currentDate, endDate))) {
		return { range: 'country', betweenRange: true }
	}

	return { range: userPlanRange, betweenRange: false }
}
