import { UserSubscription } from '@domain/user/entity/types'

export function checkFreeTrialRange(userPlanRange: UserSubscription['subscriptionRange']): { range: UserSubscription['subscriptionRange'], betweenRange: boolean } {
	const startDate = new Date('2024-08-05') // CURRENT Mudar data
	const endDate = new Date('2024-11-15')

	const currentDate = new Date()

	if (currentDate >= startDate && currentDate <= endDate) {
		return { range: 'country', betweenRange: true }
	}

	return { range: userPlanRange, betweenRange: false }
}
