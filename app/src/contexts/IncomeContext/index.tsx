import React, { createContext, useContext, useMemo, useState } from 'react'

import { IncomeEntity, IncomeEntityOptional } from '@domain/post/entity/types'

import { IncomeContextType, IncomeProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	incomeDataContext: {} as IncomeEntity,
	setIncomeDataOnContext: (data: IncomeEntityOptional) => { },
	getAditionalDataFromLastPost: () => { }
}

const IncomeContext = createContext<IncomeContextType>(initialValue)

function IncomeProvider({ children }: IncomeProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [incomeDataContext, setIncomeDataContext] = useState(initialValue.incomeDataContext)

	const setIncomeDataOnContext = async (data: IncomeEntityOptional) => {
		setIncomeDataContext({ ...incomeDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const lastUserPost = getLastUserPost()
		if (!lastUserPost) {
			return {
				range: userDataContext.subscription?.subscriptionRange || 'near',
				locationView: 'approximate',
			}
		}

		setIncomeDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		} as IncomeEntity)
		setIsSecondPost(true)
	}

	const incomeProviderData = useMemo(() => ({
		isSecondPost,
		incomeDataContext,
		setIncomeDataOnContext,
		getAditionalDataFromLastPost
	}), [incomeDataContext])

	return (
		<IncomeContext.Provider value={incomeProviderData} >
			{children}
		</IncomeContext.Provider>
	)
}

const useIncomeContext = () => useContext(IncomeContext)

export { IncomeProvider, useIncomeContext }
