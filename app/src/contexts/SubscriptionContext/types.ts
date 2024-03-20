import { ReactNode } from 'react'

import { PostCollection, UserSubscription } from '@services/firebase/types'

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
