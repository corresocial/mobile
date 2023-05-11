import React, { createContext, useContext, useMemo, useState } from 'react'

import { SocialImpactData } from './types'
import { AuthContext } from './AuthContext'
import { SocialImpactCollectionRemote } from '../services/firebase/types'

type SocialImpactContextType = {
	isSecondPost: boolean,
	socialImpactDataContext: SocialImpactData
	setSocialImpactDataOnContext: (data: SocialImpactData) => void
	getAditionalDataFromLastPost: () => void
}

interface SocialImpactProviderProps {
	children: React.ReactNode
}

const initialValue = {
	isSecondPost: false,
	socialImpactDataContext: {},
	setSocialImpactDataOnContext: (data: SocialImpactData) => { },
	getAditionalDataFromLastPost: () => { }
}

const SocialImpactContext = createContext<SocialImpactContextType>(initialValue)

function SocialImpactProvider({ children }: SocialImpactProviderProps) {
	const { userDataContext } = useContext(AuthContext)

	const [isSecondPost, setIsSecondPost] = useState(false)
	const [socialImpactDataContext, setSocialImpactDataContext] = useState(initialValue.socialImpactDataContext)

	const setSocialImpactDataOnContext = async (data: SocialImpactData) => {
		setSocialImpactDataContext({ ...socialImpactDataContext, ...data })
	}

	const getAditionalDataFromLastPost = () => {
		const userPosts = userDataContext.posts || []
		if (!userPosts || (userPosts && userPosts.length < 1)) return

		const lastUserPost: SocialImpactCollectionRemote | any = userPosts[userPosts.length - 1] || {} // TODO Type
		if (Object.keys(lastUserPost).length < 1) return

		console.log(`Dados extraidos do post: ${lastUserPost.title}`)

		setSocialImpactDataContext({
			range: lastUserPost.range || '',
			locationView: lastUserPost.locationView || '',
			location: lastUserPost.location || '',
			exhibitionPlace: lastUserPost.exhibitionPlace || '',
			exhibitionFrequency: lastUserPost.exhibitionFrequency || 'someday',
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
