import React, { createContext, useContext, useMemo, useState } from 'react'

import { SaleData } from './types'
import { IncomeCollectionRemote } from '@services/firebase/types'

import { AuthContext } from './AuthContext'

type SaleContextType = {
	isSecondPost: boolean
	saleDataContext: SaleData
	setSaleDataOnContext: (data: SaleData) => void
	getAditionalDataFromLastPost: () => void
}

interface SaleProviderProps {
	children: React.ReactNode
}

const initialValue = {
	isSecondPost: false,
	saleDataContext: {},
	setSaleDataOnContext: (data: SaleData) => { },
	getAditionalDataFromLastPost: () => { }
}

const SaleContext = createContext<SaleContextType>(initialValue)

function SaleProvider({ children }: SaleProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [saleDataContext, setSaleDataContext] = useState(initialValue.saleDataContext)

	const setSaleDataOnContext = async (data: SaleData) => {
		setSaleDataContext({ ...saleDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost: IncomeCollectionRemote | any = getLastUserPost() || {} // TODO Type
		if (!Object.keys(lastUserPost).length) return

		setSaleDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || '',
			deliveryMethod: lastUserPost.deliveryMethod || '',
			attendanceFrequency: lastUserPost.attendanceFrequency || '',
			daysOfWeek: lastUserPost.daysOfWeek || [],
			startHour: lastUserPost.startHour || '',
			endHour: lastUserPost.endHour || '',
		})
		setIsSecondPost(true)
	}

	const saleProviderData = useMemo(() => ({
		isSecondPost,
		saleDataContext,
		setSaleDataOnContext,
		getAditionalDataFromLastPost
	}), [saleDataContext])

	return (
		<SaleContext.Provider value={saleProviderData} >
			{children}
		</SaleContext.Provider>
	)
}

export { SaleProvider, SaleContext }
