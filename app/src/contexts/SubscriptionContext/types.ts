import { ReactNode } from 'react'

import { UserSubscription } from '@domain/user/entity/types'

import { PostCollection } from '@domain/post/entity/types'

export interface SubscriptionProviderProps {
	children: ReactNode
}

export interface SubscriptionData extends UserSubscription {
	currentPost?: PostCollection
}

export type SubscriptionContextType = {
	subscriptionDataContext: SubscriptionData
	setSubscriptionDataOnContext: (data: SubscriptionData) => void
	updateUserSubscription: (userSubscription: UserSubscription) => Promise<boolean> | boolean
}
