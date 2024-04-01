import { UserRepositoryInterface } from '@data/user/UserRepositoryInterface'

import { UserEntity, UserSubscription } from '../entity/types'

async function updateUserSubscriptionDataDM(useUserRepository: () => UserRepositoryInterface, userData: UserEntity, subscriptionData: UserSubscription) {
	try {
		const { localStorage, remoteStorage } = useUserRepository()

		await localStorage.saveLocalUserData({
			...userData,
			subscription: {
				customerId: userData.subscription?.customerId,
				...subscriptionData
			}
		})
		await remoteStorage.updateUserData(userData.userId, { subscription: subscriptionData })
	} catch (error) {
		console.log(error)
	}
}

export { updateUserSubscriptionDataDM }
