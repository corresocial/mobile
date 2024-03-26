import React, { createContext, useCallback, useMemo, useState, useContext } from 'react'

import { useUserRepository } from '@data/user/useUserRepository'

import { SubscriptionContextType, SubscriptionData, SubscriptionProviderProps } from './types'
import { Id, PostRange } from '@domain/post/entity/types'

import { AuthContext } from '../AuthContext'

const { localStorage, remoteStorage } = useUserRepository()

const initialValue = {
	subscriptionDataContext: { subscriptionRange: 'near' as PostRange },
	setSubscriptionDataOnContext: (data: SubscriptionData) => { },
	updateUserSubscription: (userSubscription: SubscriptionData) => new Promise<boolean>(() => { })
}

const SubscriptionContext = createContext<SubscriptionContextType>(initialValue)

function SubscriptionProvider({ children }: SubscriptionProviderProps) {
	const { userDataContext, setUserDataOnContext } = useContext(AuthContext)

	const [subscriptionDataContext, setSubscriptionDataContext] = useState(initialValue.subscriptionDataContext)

	const setSubscriptionDataOnContext = useCallback((data: SubscriptionData) => {
		setSubscriptionDataContext((prevData) => ({ ...prevData, ...data }))
	}, [])

	const updateUserSubscription = useCallback(async (userSubscription: SubscriptionData) => {
		await updateLocalUserSubscription(userSubscription)
		await updateRemoteUserSubscription(userSubscription)
		return true
	}, [])

	const updateLocalUserSubscription = async (userSubscription: SubscriptionData) => {
		setUserDataOnContext({ subscription: { ...userDataContext.subscription, ...userSubscription } })
		await localStorage.saveLocalUserData({ ...userDataContext, subscription: { customerId: userDataContext.subscription?.customerId, ...userSubscription } })
	}

	const updateRemoteUserSubscription = async (userSubscription: SubscriptionData) => {
		await remoteStorage.updateUserData(userDataContext.userId as Id, { subscription: userSubscription })
	}

	const subscriptionProviderData = useMemo(() => ({
		subscriptionDataContext,
		setSubscriptionDataOnContext,
		updateUserSubscription
	}), [subscriptionDataContext])

	return (
		<SubscriptionContext.Provider value={subscriptionProviderData} >
			{children}
		</SubscriptionContext.Provider>
	)
}

export { SubscriptionProvider, SubscriptionContext }
