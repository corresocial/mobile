import React, { createContext, useContext, useMemo, useState } from 'react'

import { CultureEntity, CultureEntityOptional } from '@domain/post/entity/types'

import { CultureContextType, CultureProviderProps } from './types'

import { AuthContext } from '../AuthContext'

const initialValue: CultureContextType = {
	isSecondPost: false,
	cultureDataContext: {} as CultureEntity,
	setCultureDataOnContext: (data: CultureEntityOptional) => { },
	getAditionalDataFromLastPost: () => { },
}

const CultureContext = createContext<CultureContextType>(initialValue)

function CultureProvider({ children }: CultureProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [cultureDataContext, setCultureDataContext] = useState(initialValue.cultureDataContext)

	const setCultureDataOnContext = async (data: CultureEntityOptional) => {
		setCultureDataContext({ ...cultureDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const lastUserPost = getLastUserPost()
		if (!lastUserPost) {
			return {
				range: userDataContext.subscription?.subscriptionRange || 'near',
				locationView: 'approximate',
			}
		}

		setCultureDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		} as CultureEntity)
		setIsSecondPost(true)
	}

	const cultureProviderData = useMemo(() => ({
		isSecondPost,
		cultureDataContext,
		setCultureDataOnContext,
		getAditionalDataFromLastPost
	}), [cultureDataContext])

	return (
		<CultureContext.Provider value={cultureProviderData}>
			{children}
		</CultureContext.Provider>
	)
}

const useCultureContext = () => useContext(CultureContext)

export { CultureProvider, useCultureContext }
