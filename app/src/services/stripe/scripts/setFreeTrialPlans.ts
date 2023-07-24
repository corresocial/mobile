/*
	CALL await setFreeTrialPlans(['RMCJAuUhLjSmAu3kgjTzRjjZ2jB2'], createCustomer, createSubscription, updateUserSubscription)
*/

import { Id, UserCollection, UserSubscription } from '../../firebase/types'
import { getUser } from '../../firebase/user/getUser'

async function setFreeTrialPlans(
	userIds: Id[],
	createCustomer: (name: string, paymentMethodId: string, userTrial?: boolean) => Promise<any>,
	createSubscription: (customerId: string, priceId: string, freeTrial?: boolean) => Promise<any>,
	updateUserSubscription: (userSubscription: UserSubscription) => Promise<boolean> | boolean
) {
	try {
		userIds.map(async (userId) => {
			const currentUser: UserCollection = await getUser(userId) || {}
			console.log(currentUser.userId)

			if (!currentUser || (currentUser.subscription && currentUser.subscription?.subscriptionRange !== 'near')) return
			if (!currentUser.userId) return

			const customerId = await createCustomer(currentUser.userId, 'a', true)
			console.log(customerId)

			const res = await createSubscription(customerId, 'price_1NJ3YxEpbbWylPkQFmsO9DHp', true) // price pais-anual
			console.log(res)

			if (!res) return

			const userSubscription: UserSubscription = {
				customerId,
				subscriptionId: res.subscriptionId,
				subscriptionRange: 'country',
				subscriptionPlan: 'yearly',
				subscriptionPaymentMethod: ''
			}

			await updateUserSubscription(userSubscription)
		})
	} catch (error: any) {
		if (error.response) {
			console.log('Status:', error.response.status)
			console.log('Data:', error.response.data)
			console.log('Headers:', error.response.headers)
			throw new Error(error)
		}
	}
}

export { setFreeTrialPlans }
