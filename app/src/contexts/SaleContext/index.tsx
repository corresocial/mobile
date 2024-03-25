import React, { createContext, useContext, useMemo, useState } from 'react'

import { SaleContextType, SalePostData, SaleProviderProps } from './types'
import { PostCollectionCommonFields } from '@services/firebase/types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	saleDataContext: {},
	setSaleDataOnContext: (data: SalePostData) => { },
	getAditionalDataFromLastPost: () => { }
}

const SaleContext = createContext<SaleContextType>(initialValue)

function SaleProvider({ children }: SaleProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [saleDataContext, setSaleDataContext] = useState(initialValue.saleDataContext)

	const setSaleDataOnContext = async (data: SalePostData) => {
		setSaleDataContext({ ...saleDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && !userPosts.length)) return

		const lastUserPost: PostCollectionCommonFields = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setSaleDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
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
