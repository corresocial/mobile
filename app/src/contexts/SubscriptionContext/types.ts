import { ReactNode } from 'react'

import { PostEntityOptional } from '@domain/post/entity/types'
import { UserSubscription, UserSubscriptionOptional } from '@domain/user/entity/types'

export interface SubscriptionProviderProps {
	children: ReactNode
}

export type SubscriptionContextType = {
	subscriptionDataContext: UserSubscription
	setSubscriptionDataOnContext: (data: UserSubscriptionOptional) => void
	currentPostOnSubscription: PostEntityOptional
	setCurrentPostDataOnContext: (data: PostEntityOptional) => void
	updateUserSubscription: (userSubscription: UserSubscription) => Promise<void>
}
