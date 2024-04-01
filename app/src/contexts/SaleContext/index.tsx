import React, { createContext, useContext, useMemo, useState } from 'react'

import { IncomeEntity, IncomeEntityOptional } from '@domain/post/entity/types'

import { SaleContextType, SaleProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	saleDataContext: {} as IncomeEntity,
	setSaleDataOnContext: (data: IncomeEntityOptional) => { },
	getAditionalDataFromLastPost: () => { }
}

const SaleContext = createContext<SaleContextType>(initialValue)

function SaleProvider({ children }: SaleProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [saleDataContext, setSaleDataContext] = useState(initialValue.saleDataContext)

	const setSaleDataOnContext = async (data: IncomeEntityOptional) => {
		setSaleDataContext({ ...saleDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setSaleDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		} as IncomeEntity)
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
