import React, { createContext, useContext, useMemo, useState } from 'react'

import { SocialImpactEntityOptional } from '@domain/post/entity/types'

import { SocialImpactProviderProps, SocialImpactContextType } from './types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	socialImpactDataContext: {},
	setSocialImpactDataOnContext: (data: SocialImpactEntityOptional) => { },
	getAditionalDataFromLastPost: () => { }
}

const SocialImpactContext = createContext<SocialImpactContextType>(initialValue)

function SocialImpactProvider({ children }: SocialImpactProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [socialImpactDataContext, setSocialImpactDataContext] = useState(initialValue.socialImpactDataContext)

	const setSocialImpactDataOnContext = async (data: SocialImpactEntityOptional) => {
		setSocialImpactDataContext({ ...socialImpactDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const lastUserPost = getLastUserPost() || {}
		if (!Object.keys(lastUserPost).length) return

		setSocialImpactDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || ''
		})
		setIsSecondPost(true)
	}

	const socialImpactProviderData = useMemo(() => ({
		isSecondPost,
		socialImpactDataContext,
		setSocialImpactDataOnContext,
		getAditionalDataFromLastPost
	}), [socialImpactDataContext])

	return (
		<SocialImpactContext.Provider value={socialImpactProviderData} >
			{children}
		</SocialImpactContext.Provider>
	)
}

export { SocialImpactProvider, SocialImpactContext }
