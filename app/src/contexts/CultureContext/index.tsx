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
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setCultureDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		})
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

export { CultureProvider, CultureContext }
