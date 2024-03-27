import React, { createContext, useCallback, useMemo, useState, useContext } from 'react'

import { PostEntityOptional, PostRange } from '@domain/post/entity/types'
import { UserSubscription, UserSubscriptionOptional } from '@domain/user/entity/types'
import { useUserDomain } from '@domain/user/useUserDomain'

import { useUserRepository } from '@data/user/useUserRepository'

import { SubscriptionContextType, SubscriptionProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const { updateUserSubscriptionData } = useUserDomain()

const initialValue = {
	subscriptionDataContext: { subscriptionRange: 'near' as PostRange },
	setSubscriptionDataOnContext: (data: UserSubscriptionOptional) => { },
	currentPostOnSubscription: {} as PostEntityOptional,
	setCurrentPostDataOnContext: (data: PostEntityOptional) => { },
	updateUserSubscription: (userSubscription: UserSubscription) => new Promise<void>(() => { })
}

const SubscriptionContext = createContext<SubscriptionContextType>(initialValue)

function SubscriptionProvider({ children }: SubscriptionProviderProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [subscriptionDataContext, setSubscriptionDataContext] = useState(initialValue.subscriptionDataContext)
	const [currentPostOnSubscription, setCurrentPostOnSubscription] = useState(initialValue.currentPostOnSubscription)

	const setSubscriptionDataOnContext = useCallback((data: UserSubscriptionOptional) => {
		setSubscriptionDataContext((prevData) => ({ ...prevData, ...data }))
	}, [])

	const updateUserSubscription = useCallback(async (userSubscription: UserSubscription) => {
		await updateUserSubscriptionData(useUserRepository, userDataContext, userSubscription)
		setUserDataOnContext({ subscription: { ...userDataContext.subscription, ...userSubscription } })
	}, [subscriptionDataContext])

	const setCurrentPostDataOnContext = useCallback((data: PostEntityOptional) => {
		setCurrentPostOnSubscription({ ...currentPostOnSubscription, ...data } as PostEntityOptional)
	}, [currentPostOnSubscription])

	const subscriptionProviderData = useMemo(() => ({
		subscriptionDataContext,
		setSubscriptionDataOnContext,
		currentPostOnSubscription,
		setCurrentPostDataOnContext,
		updateUserSubscription
	}), [subscriptionDataContext, currentPostOnSubscription])

	return (
		<SubscriptionContext.Provider value={subscriptionProviderData} >
			{children}
		</SubscriptionContext.Provider>
	)
}

export { SubscriptionProvider, SubscriptionContext }
