import React, { createContext, useContext, useMemo, useState } from 'react'

import { SocialImpactProviderProps, SocialImpactContextType, SocialImpactPostData } from './types'
import { SocialImpactCollectionRemote } from '@services/firebase/types'

import { AuthContext } from '../AuthContext'

const initialValue = {
	isSecondPost: false,
	socialImpactDataContext: {},
	setSocialImpactDataOnContext: (data: SocialImpactPostData) => { },
	getAditionalDataFromLastPost: () => { }
}

const SocialImpactContext = createContext<SocialImpactContextType>(initialValue)

function SocialImpactProvider({ children }: SocialImpactProviderProps) {
	const { userDataContext, getLastUserPost } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [socialImpactDataContext, setSocialImpactDataContext] = useState(initialValue.socialImpactDataContext)

	const setSocialImpactDataOnContext = async (data: SocialImpactPostData) => {
		setSocialImpactDataContext({ ...socialImpactDataContext, ...data })
	}

	console.log('ContextUpdated === SocialImpactContext')

	const getAditionalDataFromLastPost = () => {
		const lastUserPost: SocialImpactCollectionRemote | any = getLastUserPost() || {} // TODO Type obter mais recente
		console.log(lastUserPost.description)
		if (!Object.keys(lastUserPost).length) return

		setSocialImpactDataContext({
			range: userDataContext.subscription?.subscriptionRange || 'near',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || '',
			exhibitionPlace: lastUserPost.exhibitionPlace || '',
			exhibitionFrequency: lastUserPost.exhibitionFrequency || '',
			daysOfWeek: lastUserPost.daysOfWeek || [],
			repeat: lastUserPost.repeat || 'unrepeatable',
			startDate: lastUserPost.startDate || '',
			startHour: lastUserPost.startHour || '',
			endDate: lastUserPost.endDate || '',
			endHour: lastUserPost.endHour || '',
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
