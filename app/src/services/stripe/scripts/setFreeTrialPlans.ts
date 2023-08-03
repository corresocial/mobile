/*
	CALL in ProfileScreen(exemplo)
	await setFreeTrialPlans(
			[ ], 				  // array of userIds
			createCustomer, 	  // from StripeContext
			createSubscription,   // from StripeContext
			'city', 			  // range
			'monthly', 			  // plan
			stripeProductsPlans.cityMonthly.priceId, 	// priceId
	)
*/

import { Id, PostRange, SubscriptionPlan, UserCollection, UserSubscription } from '../../firebase/types'
import { getUser } from '../../firebase/user/getUser'
import { updateUser } from '../../firebase/user/updateUser'

async function setFreeTrialPlans(
	userIds: Id[],
	createCustomer: (name: string, paymentMethodId: string, userTrial?: boolean) => Promise<any>,
	createSubscription: (customerId: string, subscriptionPriceId: string, freeTrial?: boolean) => Promise<any>,
	subscriptionRange: PostRange,
	subscriptionPlan: SubscriptionPlan,
	priceId: string,
) {
	try {
		if (!priceId || typeof priceId !== 'string') {
			console.log('priceId is required')
			return
		}

		userIds.map(async (userId) => {
			const currentUser: UserCollection = await getUser(userId) || {}
			console.log(`Current User: ${currentUser.userId}`)

			if (!currentUser || (currentUser.subscription && currentUser.subscription?.subscriptionRange !== 'near')) return
			if (!currentUser.userId) return

			const customerId = currentUser.subscription?.customerId || await createCustomer(currentUser.userId, 'creditCard', true)
			console.log(customerId)

			const res = await createSubscription(customerId, priceId, true)
			console.log(res)

			if (!res) return

			const userSubscription: UserSubscription = {
				customerId,
				subscriptionId: res.subscriptionId,
				subscriptionRange,
				subscriptionPlan,
				subscriptionPaymentMethod: ''
			}

			console.log(userSubscription)

			await updateUser(userId, { subscription: userSubscription })
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
