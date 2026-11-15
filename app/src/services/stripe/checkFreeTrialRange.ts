import { isAfter, isBefore } from 'date-fns'

import { UserSubscription } from '@domain/user/entity/types'

/**
 * Enquanto o backend do Stripe estiver desativado, todos os planos são gratuitos: qualquer usuário publica
 * no alcance "país" e as telas de assinatura/doação ficam escondidas.
 * Para voltar a cobrar: PLANS_ARE_FREE = false (a janela de datas abaixo volta a valer).
 */
export const PLANS_ARE_FREE = true

export function checkFreeTrialRange(userPlanRange: UserSubscription['subscriptionRange']): { range: UserSubscription['subscriptionRange'], betweenRange: boolean } {
	if (PLANS_ARE_FREE) return { range: 'country', betweenRange: true }

	const startDate = new Date('2024-08-15 00:00:00')
	const endDate = new Date('2024-11-15 00:00:00')

	const currentDate = new Date()
	if (isAfter(currentDate, startDate) && (isBefore(currentDate, endDate))) {
		return { range: 'country', betweenRange: true }
	}

	return { range: userPlanRange, betweenRange: false }
}
