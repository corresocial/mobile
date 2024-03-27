import { ReactNode } from 'react'

import { PostCollection } from '@domain/post/entity/types'
import { UserSubscription, UserSubscriptionOptional } from '@domain/user/entity/types'

export interface SubscriptionProviderProps {
	children: ReactNode
}

/* export interface SubscriptionData extends UserSubscription {
	currentPost?: PostCollection // Só existe na apresentação
} */

export type SubscriptionContextType = {
	subscriptionDataContext: UserSubscription
	setSubscriptionDataOnContext: (data: UserSubscriptionOptional) => void
	currentPostOnSubscription: PostCollection
	setCurrentPostDataOnContext: (data: PostCollection) => void
	updateUserSubscription: (userSubscription: UserSubscription) => Promise<void>
}
