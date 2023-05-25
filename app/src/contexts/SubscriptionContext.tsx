import React, { createContext, useCallback, useMemo, useState } from 'react'

import { SubscriptionData } from './types'
import { PostRange } from '../services/firebase/types'

type SubscriptionContextType = {
	subscriptionDataContext: SubscriptionData
	setSubscriptionDataOnContext: (data: SubscriptionData) => void
}

interface SubscriptionProviderProps {
	children: React.ReactNode
}

const initialValue = {
	subscriptionDataContext: { postRange: 'near' as PostRange },
	setSubscriptionDataOnContext: (data: SubscriptionData) => { },
}

const SubscriptionContext = createContext<SubscriptionContextType>(initialValue)

function SubscriptionProvider({ children }: SubscriptionProviderProps) {
	const [subscriptionDataContext, setSubscriptionDataContext] = useState(initialValue.subscriptionDataContext)

	const setSubscriptionDataOnContext = useCallback((data: SubscriptionData) => {
		console.log({ ...subscriptionDataContext, ...data })
		setSubscriptionDataContext((prevData) => ({ ...prevData, ...data }))
	}, [])

	const subscriptionProviderData = useMemo(() => ({
		subscriptionDataContext,
		setSubscriptionDataOnContext
	}), [subscriptionDataContext])

	return (
		<SubscriptionContext.Provider value={subscriptionProviderData} >
			{children}
		</SubscriptionContext.Provider>
	)
}

export { SubscriptionProvider, SubscriptionContext }
